import { InitialState } from 'store';
import { Client, DocumentType } from 'api/responses/clients.type';

export const getClientsState = (state: InitialState) => state.clients;

export const getDocumentType = (client: Client | undefined) => {
    if (client) {
        debugger
        switch (client.documentType) {
            case DocumentType.NIF:
                debugger
                return 'NIF'
            case DocumentType.CIF:
                return 'CIF'
            case DocumentType.INTRA:
                return 'INTRA'
        }
    }
    return ''
}

export const getDocumentNumber = (client: Client | undefined) => {
    if (client) {
        return client.documentNum
    }
    return ''
}