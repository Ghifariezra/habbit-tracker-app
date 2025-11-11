import { HabbitAction, HabbitActionCompletions, HabbitState } from "@/types/habbits";

export function habbitReducer(state: HabbitState, action: HabbitAction) {
    switch (action.type) {
        case "CREATE":
            return {
                ...state,
                list: action.payload
            };

        case "DELETE":
            return {
                ...state,
                list: state.list.filter(h => h.$id !== action.payload)
            };

        case "UPDATE":
            return {
                ...state,
                list: state.list.map(h => (h.$id === action.payload.$id ? action.payload : h)),
            };
        default:
            return state;
    }
}

export function habbitCompletedReducer(state: string[], action: HabbitActionCompletions) {
    switch (action.type) {
        case "CREATE":
            return action.payload.map(c => c.habbit_id);
        case "APPEND":
            return state.includes(action.payload) ? state : [...state, action.payload];
        case "POP":
            return state.filter(c => c !== action.payload);
        default:
            return state;
    }
}