import React from 'react';

interface Props {
  relevance: 'Red' | 'Yellow' | 'Green';
}

const RelevanceBadge: React.FC<Props> = ({ relevance }) => {
  let styles = '';
  let text = '';
  let dotColor = '';

  switch (relevance) {
    case 'Green':
      styles = 'bg-green-500/10 border-green-500/20 text-green-400';
      dotColor = 'bg-green-400';
      text = 'Subirse ya';
      break;
    case 'Yellow':
      styles = 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400';
      dotColor = 'bg-yellow-400';
      text = 'Monitorear';
      break;
    case 'Red':
      styles = 'bg-red-500/10 border-red-500/20 text-red-400';
      dotColor = 'bg-red-400';
      text = 'Ignorar';
      break;
    default:
      styles = 'bg-gray-500/10 border-gray-500/20 text-gray-400';
      dotColor = 'bg-gray-400';
      text = 'Desconocido';
  }

  return (
    <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${styles} font-medium text-xs tracking-wide shadow-sm`}>
      <span className={`w-2 h-2 rounded-full ${dotColor} ${relevance === 'Green' ? 'animate-pulse' : ''}`}></span>
      {text}
    </div>
  );
};

export default RelevanceBadge;
