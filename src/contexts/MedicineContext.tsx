import React, { createContext,
  useState, 
  useEffect,
  useMemo,
} from "react";
import { MedicineType } from "../types/Medicine";

type Props = {
  children: React.ReactNode
};

interface MedicineContextType {
  medicinesFromServer: MedicineType[]
}

export const MedicineContext = createContext<MedicineContextType>({
  medicinesFromServer: []
});

export const MedicineProvider: React.FC<Props> = ({ children }) => {
  const [medicinesFromServer, setMedicineFromServer] = useState<MedicineType[]>([]);

  useEffect(() => {
    const fetchMedicines = async () => {
      const result = await fetch('http://localhost:3008/medicines');
      const data = await result.json();
      setMedicineFromServer(data);
    } 
    fetchMedicines();
  }, []);

  const value = useMemo(() => ({
    medicinesFromServer
  }), [medicinesFromServer]);

  return <MedicineContext.Provider value={value}>
    {children}
  </MedicineContext.Provider>;
}