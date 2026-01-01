import { FC } from 'react';

const KnowledgeLoading: FC = () => (
  <div className=" bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
      <p className="text-gray-400">Chargement...</p>
    </div>
  </div>
);

export default KnowledgeLoading;
