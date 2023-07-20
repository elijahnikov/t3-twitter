interface PageLayoutProps {
  children: React.ReactNode;
}

export const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <main className="flex h-screen justify-center">
      <div className="w-full overflow-y-auto border-x border-slate-700 md:max-w-2xl">
        {children}
      </div>
    </main>
  );
};
