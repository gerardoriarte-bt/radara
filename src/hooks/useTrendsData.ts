import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { message } from 'antd';

export interface Trend {
  id: string;
  title: string;
  origin: 'Twitter' | 'TikTok' | 'Instagram' | 'News' | 'Facebook';
  growthSpeed: 'High' | 'Medium' | 'Low';
  relevance: 'Red' | 'Yellow' | 'Green';
  date: string;
  category: string;
  rawScore?: number;
  rawAction?: string;
  avatar?: string;
  bioLink?: string;
  profileUrl?: string;
  analysis?: string;
}

export interface CompetitorData {
  key: string;
  platform: string;
  post: string;
  airline: string;
  views: number;
  shares: number;
  date: string;
}

export interface CompetitorProfile {
  id: string;
  name: string;
  platform: string;
  handle: string;
}

// Initial realistic data for Competitors
const initialCompetitorsData: CompetitorData[] = [
  { key: '1', platform: 'Instagram', airline: 'LATAM Airlines', post: 'Nuevas rutas a Europa 2026', views: 845000, shares: 12400, date: new Date().toISOString().split('T')[0] },
  { key: '2', platform: 'TikTok', airline: 'Wingo', post: 'Trend de azafatas bailando en cabina', views: 1200000, shares: 45000, date: new Date().toISOString().split('T')[0] },
  { key: '3', platform: 'Instagram', airline: 'Copa Airlines', post: 'Conectando América: Stopover en Panamá', views: 650000, shares: 8900, date: new Date().toISOString().split('T')[0] },
  { key: '4', platform: 'TikTok', airline: 'Iberia', post: 'Madrid desde las nubes - POV Piloto', views: 950000, shares: 32000, date: new Date().toISOString().split('T')[0] },
];

const initialProfiles: CompetitorProfile[] = [
  { id: '1', name: 'LATAM Airlines', platform: 'TikTok/IG', handle: '@latamairlines' },
  { id: '2', name: 'Copa Airlines', platform: 'Instagram', handle: '@copaairlines' },
  { id: '3', name: 'Iberia', platform: 'TikTok/IG', handle: '@iberia' },
  { id: '4', name: 'Wingo', platform: 'TikTok/IG', handle: '@vuelawingo' },
];

const mapTiktokEventToTrend = (payload: any): Trend => {
  const p = payload.puntaje ?? payload.Puntaje ?? 0;
  let relevance: 'Green' | 'Yellow' | 'Red' = 'Red';
  let speed: 'High' | 'Medium' | 'Low' = 'Low';

  if (p > 7) {
    relevance = 'Green';
    speed = 'High';
  } else if (p > 4) {
    relevance = 'Yellow';
    speed = 'Medium';
  }

  // Override mapping with String Action if present
  const accionRaw = payload.accion || payload.Accion || payload.Acción || '';
  if (accionRaw) {
    const act = accionRaw.toLowerCase();
    if (act.includes('subir') || act.includes('ya') || act.includes('verde')) relevance = 'Green';
    else if (act.includes('monitorear') || act.includes('amarillo')) relevance = 'Yellow';
    else if (act.includes('ignorar') || act.includes('rojo')) relevance = 'Red';
  }
  
  const generatedId = payload.id ?? payload.Id ?? Date.now().toString();
  const tendenciaStr = payload.tendencia || payload.Tendencia || payload.title || payload.Title || 'Sin título';
  const categoriaStr = payload.categoria || payload.Categoria || payload.category || payload.Category || 'General';
  const createdStr = payload.created_at || payload.CreatedAt || new Date().toISOString();

  const avatar = payload.avatar || payload.Avatar;
  let bioLink = payload.biolink || payload.Biolink || payload.bio_link;
  let profileUrl = payload.profile_url || payload.ProfileUrl || payload['profile ur'] || payload.profileUrl || payload.profile_ur;
  const analysisStr = payload.analisis || payload.Analisis || payload.analysis || '';

  // Sanitizar URLs de ejemplo de la base de datos de pruebas
  const sanitizeUrl = (url: string) => {
    if (!url) return url;
    if (url.toLowerCase().includes('example.com')) {
      const realisticAirlines = ['@latamairlines', '@copaairlines', '@vuelawingo', '@iberia', '@viajesconavianca', '@viajerosporelmundo'];
      // Deterministic choice based on length to keep it consistent on re-renders
      return realisticAirlines[url.length % realisticAirlines.length];
    }
    return url;
  };

  bioLink = sanitizeUrl(bioLink);
  profileUrl = sanitizeUrl(profileUrl);

  return {
    id: generatedId.toString(),
    title: tendenciaStr,
    category: categoriaStr,
    origin: 'TikTok',
    growthSpeed: speed,
    relevance: relevance,
    date: createdStr.split('T')[0],
    rawScore: p,
    rawAction: accionRaw,
    avatar,
    bioLink,
    profileUrl,
    analysis: analysisStr
  };
};

export const useTrendsData = (categoryFilter?: string | null) => {
  const [allTrends, setAllTrends] = useState<Trend[]>([]);
  const [competitorsPosts, setCompetitorsPosts] = useState<CompetitorData[]>(initialCompetitorsData);
  const [competitorProfiles, setCompetitorProfiles] = useState<CompetitorProfile[]>(initialProfiles);
  const [loading, setLoading] = useState<boolean>(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // 1. Carga inicial de datos de Supabase y Suscripción
  useEffect(() => {
    let channel: any;

    const fetchInitialData = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('TiktokScrap')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error("Error fetching Supabase data:", error);
          message.error(`Error de Supabase: ${error.message}`);
        } else if (data) {
          console.log("Supabase data fetched:", data);
          if (data.length === 0) {
            message.warning("Supabase conectó, pero la tabla TiktokScrap está vacía.");
          }
          const mappedData = data.map(mapTiktokEventToTrend);
          setAllTrends(mappedData);
          setLastUpdated(new Date());
        }
      } catch (e: any) {
        console.error(e);
        message.error(`Excepción: ${e.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();

    // 2. Suscripción en tiempo real
    channel = supabase
      .channel('schema-db-changes')
      .on('postgres_changes', 
          { event: 'INSERT', schema: 'public', table: 'TiktokScrap' }, 
          (payload) => {
            const newTrend = mapTiktokEventToTrend(payload.new);
            setAllTrends((prev) => [newTrend, ...prev]);
            setLastUpdated(new Date());
            message.success({
              content: `¡Nueva tendencia detectada en TikTok: ${newTrend.title}!`,
              duration: 4,
              className: 'custom-dark-message'
            });
          })
      .subscribe();

    return () => {
      if (channel) supabase.removeChannel(channel);
    };
  }, []);

  // Filter trends by category
  const filteredTrends = allTrends.filter(t => 
    (!categoryFilter || categoryFilter === 'Dashboard') ? true : t.category === categoryFilter
  );

  const addCompetitorProfile = (profile: Omit<CompetitorProfile, 'id'>) => {
    const newProfile = { ...profile, id: Date.now().toString() };
    setCompetitorProfiles(prev => [...prev, newProfile]);
    
    const newMockPost: CompetitorData = {
      key: Date.now().toString(),
      platform: profile.platform,
      airline: profile.name,
      post: `Monitoreando recientes actividades de ${profile.handle}...`,
      views: Math.floor(Math.random() * 10000),
      shares: Math.floor(Math.random() * 500),
      date: new Date().toISOString().split('T')[0],
    };
    setCompetitorsPosts(prev => [newMockPost, ...prev]);
  };

  const removeCompetitorProfile = (id: string) => {
    setCompetitorProfiles(prev => prev.filter(p => p.id !== id));
  };

  const activeCategories = Array.from(new Set(allTrends.map(t => t.category).filter(Boolean)));

  return { 
    trends: filteredTrends, 
    competitorsPosts, 
    competitorProfiles,
    activeCategories,
    addCompetitorProfile,
    removeCompetitorProfile,
    loading,
    lastUpdated
  };
};
