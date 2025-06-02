import Header from "./header";

interface ILayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: ILayoutProps): JSX.Element {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
