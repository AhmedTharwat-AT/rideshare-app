import {
  Dispatch,
  createContext,
  useContext,
  useReducer,
  useEffect,
} from "react";
import { useSearchParams } from "react-router-dom";

interface State {
  pick?: {
    marker?: L.Marker;
    coords?: L.LatLng;
    label?: string;
  };
  drop?: {
    marker?: L.Marker;
    coords?: L.LatLng;
    label?: string;
  };
}

interface ContextState extends State {
  dispatch: Dispatch<Action>;
}

const reducerState: State = {
  pick: undefined,
  drop: undefined,
};

const initialState: ContextState = {
  ...reducerState,
  dispatch: () => null,
};

const MapContext = createContext(initialState);

interface Action {
  type: string;
  payload: any;
}

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "map/addPickInfo": {
      return {
        ...state,
        pick: {
          coords: action.payload.coords,
          label: action.payload.label,
          ...state.pick,
        },
      };
    }
    case "map/addPickMarker": {
      return { ...state, pick: { marker: action.payload, ...state?.pick } };
    }
    case "map/addDropInfo": {
      return {
        ...state,
        drop: {
          coords: action.payload.coords,
          label: action.payload.label,
          ...state.drop,
        },
      };
    }
    case "map/addDropMarker": {
      return { ...state, drop: { marker: action.payload, ...state?.drop } };
    }
    default:
      return state;
  }
}

function MapProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, reducerState);
  const [searchParams, setSearchParams] = useSearchParams();
  const pick = searchParams.get("pick");
  const drop = searchParams.get("drop");

  useEffect(() => {
    if (state.pick || !pick) return;
    const { label, coords } = JSON.parse(pick);
    dispatch({ type: "map/addPickInfo", payload: { label, coords } });
  }, [pick]);

  useEffect(() => {
    if (state.drop || !drop) return;
    const { label, coords } = JSON.parse(drop);
    dispatch({ type: "map/addDropInfo", payload: { label, coords } });
  }, [drop]);

  return (
    <MapContext.Provider value={{ ...state, dispatch }}>
      {children}
    </MapContext.Provider>
  );
}

export function useMapContext() {
  const context = useContext(MapContext);
  if (!context) throw Error("user map context inside map provider");
  return context;
}

export default MapProvider;
