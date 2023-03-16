import css from "./styles.module.css"

export function Specialty() {
  return (
    <>
      <div className={css.text}>
        <h1>Especialidades</h1>

        <ul>
          <li> – Acupuntura</li>
          <li> – Fisioterapia Dermatofuncional;</li>
          <li> – Fisioterapia Esportiva;</li>
          <li> – Fisioterapia do Trabalho;</li>
          <li> – Fisioterapia Neurofuncional;</li>
          <li> – Fisioterapia Oncofuncional;</li>
          <li> – Fisioterapia Respiratória;</li>
          <li> – Fisioterapia Traumato-Ortopédica;</li>
          <li> – Osteopatia e Quiropraxia;</li>
          <li> – Fisioterapia em Saúde Coletiva;</li>
          <li> – Fisioterapia em Saúde da Mulher.</li>
        </ul>
      </div>
    </>
  );
}
