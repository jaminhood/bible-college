export default function Page ({ title, children })
{
  document.title = `${title} - Bible College`
  return (
    <>
      {children}
    </>
  )
}
