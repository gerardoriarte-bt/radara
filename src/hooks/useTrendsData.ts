import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { message } from 'antd';
import { MOCK_TELCO_TRENDS } from './mockTelcoTrends';

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
  brand: string;
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

export const industriesConfig: Record<string, {
  name: string;
  profiles: CompetitorProfile[];
  posts: CompetitorData[];
  urlMocks: string[];
}> = {
  telco: {
    name: 'Telecomunicaciones (Colombia)',
    profiles: [
      { id: '1', name: 'Claro', platform: 'TikTok/IG', handle: '@clarocolombia' },
      { id: '2', name: 'Movistar', platform: 'Instagram', handle: '@movistarcolombia' },
      { id: '3', name: 'Tigo', platform: 'TikTok/IG', handle: '@tigocolombia' },
      { id: '4', name: 'WOM', platform: 'TikTok/IG', handle: '@womcolombia' },
    ],
    posts: [
      { key: '1', platform: 'Instagram', brand: 'Claro', post: 'Nueva red 5G en todo el país', views: 845000, shares: 12400, date: new Date().toISOString().split('T')[0] },
      { key: '2', platform: 'TikTok', brand: 'WOM', post: 'Trend de portabilidad', views: 1200000, shares: 45000, date: new Date().toISOString().split('T')[0] },
      { key: '3', platform: 'Instagram', brand: 'Movistar', post: 'Fibra óptica simétrica para gamers', views: 650000, shares: 8900, date: new Date().toISOString().split('T')[0] },
      { key: '4', platform: 'TikTok', brand: 'Tigo', post: 'Beneficios pospago - POV', views: 950000, shares: 32000, date: new Date().toISOString().split('T')[0] },
    ],
    urlMocks: ['@clarocolombia', '@movistarcolombia', '@tigocolombia', '@womcolombia', '@etb']
  },
  airlines: {
    name: 'Aerolíneas (Global)',
    profiles: [
      { id: '1', name: 'LATAM Airlines', platform: 'TikTok/IG', handle: '@latamairlines' },
      { id: '2', name: 'Copa Airlines', platform: 'Instagram', handle: '@copaairlines' },
      { id: '3', name: 'Iberia', platform: 'TikTok/IG', handle: '@iberia' },
      { id: '4', name: 'Wingo', platform: 'TikTok/IG', handle: '@vuelawingo' },
    ],
    posts: [
      { key: '1', platform: 'Instagram', brand: 'LATAM Airlines', post: 'Nuevas rutas a Europa 2026', views: 845000, shares: 12400, date: new Date().toISOString().split('T')[0] },
      { key: '2', platform: 'TikTok', brand: 'Wingo', post: 'Trend de azafatas bailando en cabina', views: 1200000, shares: 45000, date: new Date().toISOString().split('T')[0] },
      { key: '3', platform: 'Instagram', brand: 'Copa Airlines', post: 'Conectando América: Stopover en Panamá', views: 650000, shares: 8900, date: new Date().toISOString().split('T')[0] },
      { key: '4', platform: 'TikTok', brand: 'Iberia', post: 'Madrid desde las nubes - POV Piloto', views: 950000, shares: 32000, date: new Date().toISOString().split('T')[0] },
    ],
    urlMocks: ['@latamairlines', '@copaairlines', '@vuelawingo', '@iberia', '@viajesconavianca', '@viajerosporelmundo']
  },
  banking: {
    name: 'Banca y Finanzas',
    profiles: [
      { id: '1', name: 'Bancolombia', platform: 'TikTok/IG', handle: '@bancolombia' },
      { id: '2', name: 'Davivienda', platform: 'Instagram', handle: '@davivienda' },
      { id: '3', name: 'Nubank', platform: 'TikTok/IG', handle: '@nubank' },
    ],
    posts: [
      { key: '1', platform: 'Instagram', brand: 'Bancolombia', post: 'Pagos con QR fácil y rápido', views: 720000, shares: 9000, date: new Date().toISOString().split('T')[0] },
      { key: '2', platform: 'TikTok', brand: 'Davivienda', post: 'Lugar equivocado trend', views: 1500000, shares: 60000, date: new Date().toISOString().split('T')[0] },
      { key: '3', platform: 'TikTok', brand: 'Nubank', post: 'Educación financiera sin costo', views: 850000, shares: 21000, date: new Date().toISOString().split('T')[0] },
    ],
    urlMocks: ['@bancolombia', '@davivienda', '@nubank', '@bancodebogota']
  }
};

const mapTiktokEventToTrend = (payload: any, industryId: string): Trend => {
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
      const urlMocks = industriesConfig[industryId]?.urlMocks || ['@brand'];
      // Deterministic choice based on length to keep it consistent on re-renders
      return urlMocks[url.length % urlMocks.length];
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

export const useTrendsData = (categoryFilter?: string | null, industryId: string = 'telco') => {
  const [allTrends, setAllTrends] = useState<Trend[]>([]);
  const [competitorsPosts, setCompetitorsPosts] = useState<CompetitorData[]>(industriesConfig[industryId].posts);
  const [competitorProfiles, setCompetitorProfiles] = useState<CompetitorProfile[]>(industriesConfig[industryId].profiles);
  const [loading, setLoading] = useState<boolean>(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Update lists when industry changes
  useEffect(() => {
    setCompetitorsPosts(industriesConfig[industryId].posts);
    setCompetitorProfiles(industriesConfig[industryId].profiles);
  }, [industryId]);

  // 1. Carga inicial de datos de Supabase y Suscripción
  useEffect(() => {
    let channel: any;

    const demoMocks = industryId === 'telco' ? MOCK_TELCO_TRENDS : [];

    const fetchInitialData = async () => {
      if (!supabase) {
        setAllTrends(demoMocks);
        setLoading(false);
        console.warn("Supabase no está configurado.");
        return;
      }
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('TiktokScrap')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error("Error fetching Supabase data:", error);
          message.error(`Error de Supabase: ${error.message}`);
          setAllTrends(demoMocks);
        } else if (data) {
          if (data.length === 0 && demoMocks.length === 0) {
            message.warning("Supabase conectó, pero la tabla TiktokScrap está vacía.");
          }
          const mappedData = data.map((d: any) => mapTiktokEventToTrend(d, industryId));
          setAllTrends([...mappedData, ...demoMocks]);
          setLastUpdated(new Date());
        }
      } catch (e: any) {
        console.error(e);
        message.error(`Excepción: ${e.message}`);
        setAllTrends(demoMocks);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();

    if (!supabase) return;

    // 2. Suscripción en tiempo real
    channel = supabase
      .channel('schema-db-changes')
      .on('postgres_changes', 
          { event: 'INSERT', schema: 'public', table: 'TiktokScrap' }, 
          (payload: any) => {
            const newTrend = mapTiktokEventToTrend(payload.new, industryId);
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
  }, [industryId]); // Re-fetch or re-map when industry changes

  const deleteTrend = async (id: string) => {
    if (!supabase) {
      // Si no hay supabase (local/demo), eliminamos solo del estado
      setAllTrends(prev => prev.filter(t => t.id !== id));
      message.success('Tendencia eliminada (Local/Demo)');
      return;
    }

    try {
      const { error } = await supabase
        .from('TiktokScrap')
        .delete()
        .eq('id', id);

      if (error) {
        console.error("Error deleting trend:", error);
        message.error(`Error al eliminar: ${error.message}`);
      } else {
        setAllTrends(prev => prev.filter(t => t.id !== id));
        message.success('Tendencia eliminada correctamente');
      }
    } catch (e: any) {
      console.error(e);
      message.error(`Excepción al eliminar: ${e.message}`);
    }
  };

  // Filter trends by category and exclude Airlines / Travel as requested
  const AIRLINE_TRAVEL_REGEX = /aerol[ií]nea|airline|avianca|latam|copa\s*airline|\biberia\b|wingo|satena|jetsmart|viaj|vuel|flight|aeropuerto|airport|aviaci[óo]n|aviation|turism|azafata|aeromoza|piloto\s+de\s+avi[óo]n|cabin\s+crew|ryanair|lufthansa|emirates|qatar|aerom[eé]xico|easyjet|\bklm\b|air\s+france|united\s+airlines|american\s+airlines|delta\s+airlines|boleto|pasaje|equipaje|maleta/i;

  const filteredTrends = allTrends
    .filter(t => {
      const isDashboard = !categoryFilter || categoryFilter === 'Dashboard';
      const categoryMatches = isDashboard ? true : t.category === categoryFilter;

      // Mocks de telco siempre pasan (no correr regex sobre data conocida)
      if (t.id.startsWith('mock-telco-')) return categoryMatches;

      const haystack = `${t.title} ${t.category} ${t.analysis ?? ''} ${t.bioLink ?? ''} ${t.profileUrl ?? ''}`;
      const isAirlineOrTravel = AIRLINE_TRAVEL_REGEX.test(haystack);

      return categoryMatches && !isAirlineOrTravel;
    })
    .sort((a, b) => b.date.localeCompare(a.date));

  const addCompetitorProfile = (profile: Omit<CompetitorProfile, 'id'>) => {
    const newProfile = { ...profile, id: Date.now().toString() };
    setCompetitorProfiles(prev => [...prev, newProfile]);
    
    const newMockPost: CompetitorData = {
      key: Date.now().toString(),
      platform: profile.platform,
      brand: profile.name,
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
    deleteTrend,
    loading,
    lastUpdated
  };
};

