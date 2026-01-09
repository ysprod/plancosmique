import CINQ_PORTES_NOT_AVAILABLE from './cinqPortesNotAvailable';

export default function CinqPortesNotAvailableSection() {
  return (
    <section className="mb-6 px-3">
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-center">
        <p className="text-white/50 text-sm">
          {CINQ_PORTES_NOT_AVAILABLE}
        </p>
      </div>
    </section>
  );
}
