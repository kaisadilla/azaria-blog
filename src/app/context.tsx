import { OsWindow, PartialOsWindow } from "@/logic/OsWindow";
import { deleteArrayItem, deleteArrayItemAt, Vec2 } from "@/utils";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

interface OsContextState {
    windows: OsWindow[];
    activeWindowId: string | null;
    openWindow: (partialWindow: PartialOsWindow) => void;
    updateWindow: (window: OsWindow) => void;
    closeWindow: (windowId: string) => void;
    setActiveWindow: (windowId: string | null) => void;
}

const OsContext = createContext<OsContextState>({} as OsContextState);
const useOsContext = () => useContext(OsContext);

const OsContextProvider = ({ children }: any) => {
    const [state, setState] = useState<OsContextState>({
        windows: [] as OsWindow[],
        activeWindowId: null,
    } as OsContextState);

    const value = useMemo(() => {
        function openWindow (partialWindow: PartialOsWindow) {
            setState(prevState => {
                const newArr = [...prevState.windows];
                const index = newArr.findIndex(w => w.id === partialWindow.id);
                if (index !== -1) {
                    return {
                        ...prevState,
                        activeWindowId: partialWindow.id,
                    };
                }

                const window: OsWindow = {
                    ...partialWindow,
                    position: getEmptyWindowPosition({x: 100, y: 50}),
                }

                return {
                    ...prevState,
                    windows: [
                        ...prevState.windows,
                        window,
                    ],
                    activeWindowId: partialWindow.id,
                };
            });
        }

        function updateWindow (window: OsWindow) {
            setState(prevState => {
                const index = prevState.windows.findIndex(w => w.id === window.id);
                if (index < 0) return prevState;

                const newArr = [...prevState.windows];
                newArr[index] = window;
                
                return {
                    ...prevState,
                    windows: newArr,
                };
            });
        }

        function closeWindow (windowId: string) {
            setState(prevState => {
                const newArr = [...prevState.windows];
                const index = newArr.findIndex(w => w.id === windowId);
                deleteArrayItemAt(newArr, index);

                return {
                    ...prevState,
                    windows: newArr,
                }
            });
        }

        function setActiveWindow (windowId: string | null) {
            setState(prevState => ({
                ...prevState,
                activeWindowId: windowId,
            }));
        }

        return {
            ...state,
            openWindow,
            updateWindow,
            closeWindow,
            setActiveWindow,
        }
    }, [state]);

    return (
        <OsContext.Provider value={value}>
            {children}
        </OsContext.Provider>
    );

    /**
     * Returns the position given if no window is exactly in that position, or
     * a suitable position below it so the window is not in the same exact place
     * as any other window.
     * @param origin The preferred position for the window.
     */
    function getEmptyWindowPosition (origin: Vec2) : Vec2 {
        if (origin.x > 1000 || origin.x > 1000) return origin;

        for (const w of state.windows) {
            if (w.position.x === origin.x && w.position.y === origin.y) {
                return getEmptyWindowPosition({
                    x: origin.x + 25,
                    y: origin.y + 25
                });
            }
        }

        return origin;
    }
}

export {
    useOsContext,
    OsContextProvider,
};
