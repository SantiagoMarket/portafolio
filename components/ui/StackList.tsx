/** Las herramientas del proyecto, en fila tras la etiqueta "Stack". */
export default function StackList({ title, tools }: { title: string; tools: string[] }) {
  return (
    <ul className="le-stack" aria-label={`Stack: ${title}`}>
      <li className="le-stack__label">Stack</li>
      {tools.map((tool) => (
        <li key={tool}>{tool}</li>
      ))}
    </ul>
  );
}
