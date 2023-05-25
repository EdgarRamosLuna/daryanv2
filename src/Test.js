import React from 'react';
import ReactPDF, { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

// Create Document Component
const PdfTest = () => (
  <Document>
    <Page size="A4" style={styles.page}>
    <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Occupation</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>John Doe</td>
                <td>30</td>
                <td>Software Engineer</td>
              </tr>
              <tr>
                <td>Jane Doe</td>
                <td>25</td>
                <td>Doctor</td>
              </tr>
              <tr>
                <td>Peter Smith</td>
                <td>40</td>
                <td>Lawyer</td>
              </tr>
            </tbody>
          </table>
    </Page>
  </Document>
);
export default PdfTest;

// Save the PDF

