"use client";

import React, { useState } from "react";
import { saveAs } from "file-saver";
import { fetchAnggotaAcara, AnggotaAcara } from "./fetch"; // Adjust the import path as needed

const GenerateCertificate: React.FC<{ memberId: string; selectedActivity: string }> = ({ memberId, selectedActivity }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateCertificate = async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch the member data
      const memberData: AnggotaAcara = await fetchAnggotaAcara(memberId);
      if (!memberData) {
        setError("Member data not found");
        setLoading(false);
        return;
      }

      // LaTeX template for the certificate
      const latexContent = `
\\documentclass[a4paper,12pt]{article}
\\usepackage[utf8]{inputenc}
\\usepackage{geometry}
\\usepackage{fancyhdr}
\\usepackage{graphicx}
\\usepackage{xcolor}

% Page layout
\\geometry{margin=1in}

% Header and footer
\\pagestyle{fancy}
\\fancyhf{}
\\renewcommand{\\headrulewidth}{0pt}
\\fancyfoot[C]{\\thepage}

% Document start
\\begin{document}

% Certificate title
\\begin{center}
{\\Huge\\textbf{CERTIFICATE OF ACHIEVEMENT}} \\\\
\\vspace{1cm}
{\\Large Presented to} \\\\
\\vspace{0.5cm}
\end{center}

% Recipient details
\\begin{center}
{\\Large\\textbf{${memberData.nama}}} \\\\
\\vspace{0.2cm}
{\\large NIM: ${memberData.nim}} \\\\
\\vspace{0.2cm}
{\\large For participation in} \\\\
\\vspace{0.2cm}
{\\Large\\textbf{${selectedActivity || "Workshop Python"}}} \\\\
\\vspace{0.2cm}
{\\large Held on: ${new Date().toLocaleDateString("en-GB")}} \\\\
\\vspace{0.2cm}
{\\large Grade: ${memberData.grade || "A"}} \\\\
\\vspace{1cm}
\end{center}

% Signature section
\\begin{center}
\\vspace{2cm}
\\includegraphics[width=0.3\\textwidth]{signature.png} % Replace with actual signature image path if available
\\vspace{0.5cm}
{\\large Coordinator} \\\\
\\vspace{0.5cm}
{\\large Simponia Community}
\end{center}

% Document end
\\end{document}
      `;

      // Save the LaTeX content to a .tex file
      const blob = new Blob([latexContent], { type: "text/x-tex" });
      saveAs(blob, "certificate.tex");

      // Note: Actual PDF generation would require a LaTeX compiler (e.g., latexmk) on the server or client-side library
      alert("Certificate .tex file generated. Please compile it with a LaTeX editor to get the PDF.");
    } catch (err) {
      console.error("Error generating certificate:", err);
      setError(err instanceof Error ? err.message : "Failed to generate certificate");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={generateCertificate}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition"
      >
        {loading ? "Generating..." : "Generate Certificate"}
      </button>
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </>
  );
};

export default GenerateCertificate;