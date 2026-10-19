import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";

export const metadata: Metadata = {
  title: "Política de privacidad — Santiago Cubillos",
  description: "Qué datos recoge la agenda de soysantiago.com y para qué se usan.",
};

const EMAIL = "sant4cubillos@outlook.com";

/**
 * Política corta y pública: Google la exige para publicar la app de OAuth que
 * usa /agenda. Solo cubre lo que la agenda hace de verdad.
 */
const SECTIONS: { title: string; body: string[] }[] = [
  {
    title: "Responsable",
    body: [
      `Victor Santiago Cubillos Cruz es el responsable del tratamiento de los datos que se recogen en soysantiago.com. Para cualquier consulta: ${EMAIL}.`,
    ],
  },
  {
    title: "Qué datos se recogen",
    body: [
      "Solo los que escribes al agendar una llamada en /agenda: nombre, correo electrónico, empresa, motivo de la llamada y la fecha y hora que eliges.",
    ],
  },
  {
    title: "Para qué se usan",
    body: [
      "Para agendar la llamada: con ellos se crea un evento en mi Google Calendar con un enlace de Google Meet, al que quedas invitado.",
      "Para enviarte el correo de confirmación.",
      "No se usan para publicidad ni se venden, alquilan o ceden a terceros.",
    ],
  },
  {
    title: "Datos de Google",
    body: [
      "La agenda accede a mi propia cuenta de Google Calendar solo para consultar mis horarios ocupados y crear el evento de la llamada. No accede a tu cuenta de Google.",
      "El uso y la transferencia de la información recibida de las APIs de Google cumplen la Google API Services User Data Policy, incluidos los requisitos de Uso Limitado.",
    ],
  },
  {
    title: "Cuánto tiempo se guardan",
    body: [
      "Los datos viven en el evento del calendario y en los correos de confirmación. Se conservan mientras sean útiles para la relación profesional y se borran si lo pides.",
    ],
  },
  {
    title: "Tus derechos",
    body: [
      `Conforme a la Ley 1581 de 2012 (Colombia), puedes conocer, actualizar, rectificar y pedir que se supriman tus datos, o revocar la autorización, escribiendo a ${EMAIL}.`,
    ],
  },
];

export default function PrivacidadPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen" style={{ backgroundColor: "var(--bg)" }}>
        <div className="max-w-xl mx-auto px-6 py-16">
          <div className="mb-10">
            <p className="text-sm font-sans mb-2" style={{ color: "var(--burg)" }}>
              soysantiago.com/privacidad
            </p>
            <h1 className="font-display text-4xl mb-3" style={{ color: "var(--text-1)" }}>
              Política de privacidad
            </h1>
            <p className="text-base" style={{ color: "var(--text-3)" }}>
              Última actualización: 6 de octubre de 2026
            </p>
          </div>

          <div className="space-y-8">
            {SECTIONS.map((section) => (
              <section key={section.title}>
                <h2 className="font-display text-2xl mb-3" style={{ color: "var(--text-1)" }}>
                  {section.title}
                </h2>
                <div className="space-y-3">
                  {section.body.map((paragraph) => (
                    <p key={paragraph} className="text-base" style={{ color: "var(--text-2)" }}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <p className="text-base mt-10" style={{ color: "var(--text-3)" }}>
            Correo de contacto:{" "}
            <a href={`mailto:${EMAIL}`} className="underline" style={{ color: "var(--burg)" }}>
              {EMAIL}
            </a>
          </p>
        </div>
      </main>
    </>
  );
}
