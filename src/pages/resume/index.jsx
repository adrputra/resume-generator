import { GetUserData  } from "../../service/action"

export default function Resume() {
    const data = GetUserData({ id: '658e7552-66d9-477b-8a79-6fd4840f4257' })

    return (
        <>
            <p>{data}</p>
            <button>Download</button>
        </>
    )
}