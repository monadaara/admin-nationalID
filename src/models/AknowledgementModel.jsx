import React, { useEffect } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
} from "@chakra-ui/react";
import moment from "moment/moment";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  PDFDownloadLink,
  Image,
  Font,
} from "@react-pdf/renderer";
import flag from "/flag.png";

Font.register({
  family: "Poppins",
  src: "/Poppins-Regular.ttf", // Replace with the correct path to the Poppins Regular font file.
});
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff", // Use six 'f' characters for white (#ffffff)
    padding: 20,
    fontFamily: "Poppins",
  },
  heading1: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 20,
  },
  heading2: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
  },
  section: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  imageContainer: {
    width: 100,
    height: 80,
    borderWidth: 1,
    borderColor: "#333",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  qrCode: {
    width: 150,
    height: 150,
    alignSelf: "center", // Center the QR code horizontally
    marginTop: 10,
  },
  text: {
    fontWeight: "light",
  },
});

const PdfInstance = ({ data }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.heading1}>National Identity System</Text>
          <Text style={styles.heading2}>Aknowledgement Letter:</Text>
          <View style={styles.section}>
            <View>
              <Text>
                <Text className="font-medium">Date: </Text>
                {moment(data.created_at).format("DD-MMMM-yyyy")}
              </Text>
              <Text>
                <Text className="font-medium">Transaction id: </Text>
                {data.applicant?.transaction_code}
              </Text>
              <Text style={styles.text}>
                <Text className="font-medium">Full Name: </Text>
                {`${data.applicant.first_name} ${data.applicant.middle_name} ${data.applicant.last_name}`}
              </Text>
            </View>
            <View style={styles.imageContainer}>
              <Image style={styles.image} src={data.applicant.image.image} />
            </View>
          </View>
          <View style={{ textAlign: "center", marginTop: 16 }}>
            <Image style={styles.qrCode} src={data.qr_code} />
          </View>
        </View>
      </Page>
    </Document>
  );
};
const AknowledgementModal = ({ onHide, show, data, setCloseModel }) => {
  return (
    <Modal isOpen={show} onClose={onHide}>
      <ModalOverlay />
      <ModalContent width="800px" maxW="90%">
        <ModalHeader>Aknowlegement</ModalHeader>
        <ModalCloseButton />
        <ModalBody id="pdf-content">
          <div className="w-full border-b  border-slate-500 py-7">
            <h1 className="text-3xl text-center font-medium">
              National Identity System
            </h1>
          </div>
          <div className="w-full mt-2">
            <h1 className="text-2xl font-medium text-center">
              Aknowledgement Latter:
            </h1>
          </div>

          <section className="mt-5 ml-2 mr-5  flex justify-between items-center">
            <div className="">
              <p className="mb-2">
                <strong>Date: </strong>
                {moment(data.created_at).format("DD-MMMM-yyyy")}
              </p>
              <p className="mb-2">
                <strong>Transaction id: </strong>
                {data.applicant?.transaction_code}
              </p>
              <p className="mb-2">
                <strong>Full Name: </strong>
                {data.applicant.first_name +
                  " " +
                  data.applicant.middle_name +
                  " " +
                  data.applicant.last_name}
              </p>
            </div>

            <div className="border border-slate-600">
              <img
                className="w-32 h-24  "
                src={data.applicant.image.image}
                alt=""
              />
            </div>
          </section>

          <div className="w-full flex justify-center items-center my-16">
            <img className="text-center w-52" src={data.qr_code} alt="" />
          </div>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3}>
            Print
          </Button>
          <Button
            onClick={() => {
              setCloseModel(true);
            }}
            variant="ghost"
          >
            <PDFDownloadLink
              document={<PdfInstance data={data} />}
              fileName="Aknowlegement_latter.pdf"
            >
              {({ blob, url, loading, error }) =>
                loading ? "Loading..." : "Download!"
              }
            </PDFDownloadLink>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AknowledgementModal;
