import { GetAllData  } from "../../service/action"

export default function Resume({data}) {
    // const data = GetAllData({ id: '658e7552-66d9-477b-8a79-6fd4840f4257' })

    return (
        <>
            <p>{data}</p>
            <button>Download</button>
        </>
    )
}

export async function getServerSideProps() {
    const rows = await GetAllData({ id: '658e7552-66d9-477b-8a79-6fd4840f4257' });
    console.log(rows);
    return {
      props: {
        data: JSON.stringify(rows),
      },
    };
  }