import ContentBox from "./components/contentBox";
export default function ErrorPage() {
  return (
    <ContentBox className="flex flex-col items-center">
      <h1>Oops! Page not found</h1>
      <p className="">Sorry, an unexpected error has occurred.</p>
    </ContentBox>
  );
}
