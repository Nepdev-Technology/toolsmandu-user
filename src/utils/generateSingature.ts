import * as crypto from 'crypto';

interface SignatureParams {
  totalAmount: number;
  transactionUuid: string;
  productCode: string | number;
}
interface FonepaySignatureParams {
  PID: string;
  MD: string;
  PRN: number;
  AMT: number;
  CRN: string;
  DT: string;
  R1: string;
  R2: string;
  RU: string;
}

export function generateSignatureForFonepay(
  params: FonepaySignatureParams
): string {
  const { PID, MD, PRN, AMT, CRN, DT, R1, R2, RU } = params;

  const dataString = `PID=${PID}&MD=${MD}&PRN=${PRN}&AMT=${AMT}&CRN=${CRN}&DT=${DT}&R1=${R1}&R2=${R2}&RU=${RU}`;

  const hmac = crypto
    .createHmac('sha256', '8gBm/:&EnhH.1/q')
    .update(dataString)
    .digest('base64');

  return hmac;
}
export function generateSignature(params: SignatureParams): string {
  const { totalAmount, transactionUuid, productCode } = params;

  const dataString = `total_amount=${totalAmount},transaction_uuid=${transactionUuid},product_code=${productCode}`;

  const hmac = crypto
    .createHmac('sha256', '8gBm/:&EnhH.1/q')
    .update(dataString)
    .digest('base64');

  return hmac;
}

export function generateUUID(): string {
  const bytes = crypto.randomBytes(16);
  bytes[6] = (bytes[6] & 0x0f) | 0x40; // Set version to 4
  bytes[8] = (bytes[8] & 0x3f) | 0x80; // Set bits 6-7 to 10
  return bytes.toString('hex', 0, 16);
}
