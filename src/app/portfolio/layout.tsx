import ClientLayout from "./ClientLayout";

interface Props {
  children: React.ReactNode;
}

export default function PortfolioLayout ({ children }: Props) {
  return (
    <ClientLayout>
      {children}
    </ClientLayout>
  );
}
