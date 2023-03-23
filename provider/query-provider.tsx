import {
    QueryClient,
} from '@tanstack/react-query'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"


const queryClient = new QueryClient()
// {
//     defaultOptions: {
//         queries: {
//             staleTime: Infinity,
//             cacheTime: 1000
//         }
//     }
// }

const asyncStoragePersister = createAsyncStoragePersister({
    storage: AsyncStorage
})

export default function QueryProvider({ children }: { children: React.ReactNode }) {
    return (
        <PersistQueryClientProvider
            client={queryClient}
            persistOptions={{ persister: asyncStoragePersister }}
        >
            {children}
        </PersistQueryClientProvider>
    )
}