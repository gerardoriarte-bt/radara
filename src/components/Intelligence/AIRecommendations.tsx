import { RobotOutlined } from '@ant-design/icons';

interface Props {
  industry: string;
}

const AIRecommendations = ({ industry }: Props) => {
  return (
    <div className="bg-[#0f172a] p-8 rounded-none border-t border-slate-800 mt-0 shadow-2xl">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <RobotOutlined className="text-[#f97316] text-xl" />
          <h4 className="uppercase tracking-tighter font-black m-0 text-white text-base">Briefing Táctico IA</h4>
        </div>
        <div className="bg-[#f97316] text-white text-[9px] font-black px-3 py-1 rounded-none tracking-widest">
            LIVE ANALYSIS
        </div>
      </div>
      
      <div className="space-y-6">
        {/* Narrativa Táctica con alto contraste */}
        <div className="p-1 border-l-4 border-[#f97316] pl-6">
            <p className="text-white text-xl leading-tight font-black tracking-tight m-0">
                El radar detecta una ventana de oportunidad crítica en el segmento de <span className="text-[#f97316]">Conectividad 5G y Gaming</span>. Mientras la competencia se centra en precio, existe un vacío narrativo en <span className="text-orange-400 underline decoration-2 underline-offset-4">experiencia de usuario real</span>.
            </p>
        </div>

        <p className="text-slate-300 text-sm leading-relaxed font-semibold m-0">
            Se recomienda al equipo de redes sociales pivotar hacia contenidos de demostración técnica en vivo. Los formatos de "Speed Test" integrados en rutinas diarias están sobre-indexando en el algoritmo de TikTok para la industria <span className="text-white font-black underline">{industry}</span>. Es imperativo capitalizar el sentimiento positivo antes del próximo ciclo de facturación de la competencia.
        </p>

        {/* Bloques de Acción Rápida */}
        <div className="grid grid-cols-1 gap-4 mt-8">
            <div className="bg-slate-800/50 p-6 border border-slate-700">
                <span className="text-[#f97316] text-[10px] font-black uppercase tracking-widest block mb-2">Acción Inmediata</span>
                <p className="text-white text-base font-black uppercase tracking-tight m-0 leading-tight">Lanzar "Gaming Challenge" en TikTok</p>
            </div>
            <div className="bg-slate-800/50 p-6 border border-slate-700">
                <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest block mb-2">Foco de Segmentación</span>
                <p className="text-white text-base font-black uppercase tracking-tight m-0 leading-tight">Audiencia 18-28 años (Zonas Urbanas)</p>
            </div>
        </div>

        <div className="pt-6 mt-6 border-t border-slate-800 flex justify-between items-center">
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Sincronizado: Supabase</span>
            </div>
            <span className="text-[10px] text-slate-600 font-black tracking-widest">MODELO: GEMINI-1.5-PRO</span>
        </div>
      </div>
    </div>
  );
};

export default AIRecommendations;
