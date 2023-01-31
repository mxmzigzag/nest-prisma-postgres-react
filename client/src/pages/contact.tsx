import React from "react";

import PageLayout from "../layouts/page.layout";
import ContactForm from "../features/ContactForm/contactForm";

export default function Contact() {
  return (
    <PageLayout title="Contact us">
      <p className="text-lg text-center mb-6">
        If you have something to tell. Send us a letter!
      </p>
      <ContactForm />
    </PageLayout>
  );
}
