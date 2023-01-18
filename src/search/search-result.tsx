type SearchResultProps = {
  text: string
}

export default function ({ text }: SearchResultProps) {
  return (
    <section>
      <h2>Search result</h2>
      <p>{text}</p>
    </section>
  )
}
