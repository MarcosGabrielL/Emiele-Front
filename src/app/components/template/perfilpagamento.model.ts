
export interface Perfil{
    
    id: String;
    email: String;
    password: String;
    firstName: String;
    lastName: String;
  banco: string;
  tipoconta: string;
  numeroconta: string;
  agencia: string;
  nomecompleto: string;
  cpf: string;

  numeroCartao1: string;
  numeroCartao2: string;
  numeroCartao3: string;
  numeroCartao4: string;
  titular: string;
  mesvencimento: string;
  anovencimento: string;
  cvv: string;
    
}

export interface NewPreferenceDTO {
    accessToken: String;
    items: PreferenceItem[];
}

export interface PreferenceItem{
     name: String;
     quantity: number;
     price: number;
}




//-----------------------------------------------------------------------------------------------//

// import com.fasterxml.jackson.databind.ObjectMapper; // version 2.11.1
// import com.fasterxml.jackson.annotation.JsonProperty; // version 2.11.1
/* ObjectMapper om = new ObjectMapper();
Root root = om.readValue(myJsonString, Root.class); */
export interface  Item{
    id: String;
    title: String;
    description: String;
    categoryId: String;
    quantity: number;
    currencyId: String;
    unitPrice: String;
}

export interface Phone{
    areaCode: String;
    number: String;
}

export interface Identification{
     type: String;
    number: String;
}

export interface Address{
    zipCode: String;
    streetName: String;
}

export interface Payer{
    name: String;
    surname: String;
    email: String;
    phone: Phone;
    identification: Identification;
    address: Address;
}

export interface ExcludedPaymentMethod{
    id: String;
}

export interface ExcludedPaymentType{
    id: String;
}

export interface PaymentMethods{
    excludedPaymentMethods: ExcludedPaymentMethod[];
    excludedPaymentTypes: ExcludedPaymentType[];
}

export interface ReceiverAddress{
     floor: String;
     apartment: String;
     zipCode: String;
     streetName: String;
}

export interface Shipments{
     receiverAddress: ReceiverAddress;
}

export interface BackUrls{
     success: String;
     pending: String;
     failure: String;
}

export interface Metadata{
}

export interface Root{
   items: Item[];
   payer: Payer;
   paymentMethods: PaymentMethods;
   shipments: Shipments;
   backUrls: BackUrls;
   id: String;
   initPoint: String;
   sandboxInitPoint: String;
   dateCreated: String;
   operationType: String;
   metadata: Metadata;
   additionalInfo: String;
   externalReference: String;
   expires: boolean;
   collectorId: number
   clientId: number
   marketplace: String;
   marketplaceFee: number
   binaryMode: boolean
}

export interface RootDTO{
   items:String;
   payer: String;
   paymentMethods: String;
   shipments: String;
   backUrls: String;
   id: String;
   initPoint: String;
   sandboxInitPoint: String;
   dateCreated: String;
   operationType: String;
   metadata: String;
   additionalInfo: String;
   externalReference: String;
   expires: boolean;
   collectorId: number
   clientId: number
   marketplace: String;
   marketplaceFee: number;
   binaryMode: boolean;
   vendedor_id: String;
}

export interface ResultPago {
    
   id: String;
   reques: String;
   collectionId: String;
   collectionStatus: String;
   externalReference: String;
   paymentType: String;
   merchantOrderId: String;
   preferenceId: String;
    siteId: String;
   processingMode: String;
   merchantAccountId: String;
   attributes: String;
}