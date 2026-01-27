'use client';
import ConsultationCard from '@/components/cinqetoiles/ConsultationCard';
import LoadingState from '@/components/cinqetoiles/LoadingState';
import SelectionHeader from '@/components/cinqetoiles/SelectionHeader';

export function Slide4SectionSelection({ loading, choices, handleSelect }: any) {
  return (
    <div key="selection"    >
      <SelectionHeader />
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
          {loading ? (
            <LoadingState />
          ) : (
            choices.map((choice: any) => (
              <div key={choice._id}>
                <ConsultationCard choice={choice} />
              </div>
            ))
          )}
        </div>
        {!loading && choices.length > 0 && (
          <div className="flex justify-center">
            <button
              onClick={handleSelect}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:from-purple-700 hover:to-pink-700 transition-all flex items-center gap-2"
            >
              <span>Consulter Maintenant</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}