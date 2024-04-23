"use client";

import { Container } from "./ui/Container";
import SimpleLayout from "./ui/SimpleLayout";

export default function Page() {
  // return <Container>there was an error</Container>;
  return <SimpleLayout intro="this is an error page">404</SimpleLayout>;
}
