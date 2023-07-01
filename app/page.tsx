import Image from 'next/image'
import CharacterCard from './Components/CharacterCard'
import { getCharacters } from './utils/api'

export default async function Home() {

  const charcters = await getCharacters();

  console.log(charcters);

  return (
    <main>
      <div className='container text-center mt-10'>
        <h1 className='text-3xl font-bold underline'>
          Popular Character
        </h1>
        <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-3 mt-10'>
          {charcters.results.map(character => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
      </div>
    </main>
  )
}
