/**
 * El recorrido del proyecto dibujado como una línea de metro: cada paso es una
 * estación. El trazo lo decide `data-route` en la ficha, no esta lista.
 */
export default function RouteList({ title, steps }: { title: string; steps: string[] }) {
  return (
    <ol className="route" aria-label={`Recorrido: ${title}`}>
      {steps.map((step) => (
        <li key={step}>{step}</li>
      ))}
    </ol>
  );
}
