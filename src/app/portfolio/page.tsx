import NoProjectShowcase from './NoProjectShowcase';

interface Props {
  params: {
    entryId: string;
  };
}

function PortfolioPage ({ params }: Props) {
  return (
    <NoProjectShowcase />
  );
}

export default PortfolioPage;
