import { useState, useEffect } from "react";

const select = ({ title, value }: { title: string; value: string }) => {
    return { title, value };
}

interface State {
    isOpen: boolean;
    selected: { title: string; value: string } | null;
}

const listeners: Array<(state: State) => void> = []
let memoryState: State = {
    isOpen: false,
    selected: null,
}

const useSearchSelect = () => {
  const [state, setState] = useState<State>(memoryState)

    useEffect(() => {
        listeners.push(setState)
        return () => {
            const index = listeners.indexOf(setState)
            if (index > -1) {
            listeners.splice(index, 1)
            }
        }
    }, [])

    const updateState = (partial: Partial<State>) => {
        memoryState = { ...memoryState, ...partial };
        listeners.forEach((listener) => {
        listener(memoryState);
        });
    };
    
    return {
        isOpen: state.isOpen,
        selected: state.selected,
        select,
        setIsOpen: (isOpen: boolean) => updateState({ isOpen }),
        setSelected: (selected: { title: string; value: string } | null) => updateState({ selected }),
    };
};

export {
    select,
    useSearchSelect
}
