import React, { createContext,
  useState, 
  useEffect,
  useMemo,
  useCallback,
} from "react";

type Props = {
  children: React.ReactNode
};

interface SidebarContextType {
  handleClose: () => void,
  isOpen: boolean,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const SidebarContext = createContext<SidebarContextType>({
  handleClose: () => {},
  isOpen: false,
  setIsOpen: () => {},
});

export const SidebarProvider: React.FC<Props> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const value = useMemo(() => ({
    isOpen,
    setIsOpen,
    handleClose
  }), [
    isOpen,
    setIsOpen,
    handleClose
  ]);

  return <SidebarContext.Provider value={value}>
    {children}
  </SidebarContext.Provider>;
}