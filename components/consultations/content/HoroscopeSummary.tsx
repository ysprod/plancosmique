export default function HoroscopeSummary({ horoscope }: { horoscope: any }) {
  if (!horoscope) return null;
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-fuchsia-700">Prévisions générales</h3>
        <p>{horoscope.generalForecast}</p>
        <div>
          <h4 className="font-semibold text-violet-600">Amour</h4>
          <p>{horoscope.love}</p>
        </div>
        <div>
          <h4 className="font-semibold text-violet-600">Travail</h4>
          <p>{horoscope.work}</p>
        </div>
        <div>
          <h4 className="font-semibold text-violet-600">Santé</h4>
          <p>{horoscope.health}</p>
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-fuchsia-600">Conseil spirituel</h4>
          <p>{horoscope.spiritualAdvice}</p>
        </div>
        <div>
          <h4 className="font-semibold text-violet-600">Couleur porte-bonheur</h4>
          <p>{horoscope.luckyColor}</p>
        </div>
        <div>
          <h4 className="font-semibold text-violet-600">Planète dominante</h4>
          <p>{horoscope.dominantPlanet}</p>
        </div>
      </div>
    </div>
  );
}
