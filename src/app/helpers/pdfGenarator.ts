import { randomUUID } from 'crypto';
import puppeteer from 'puppeteer';

export async function pdfGenarator(body: string) {
  try {
    const browser = await puppeteer.launch({
      executablePath: '/usr/bin/chromium-browser',
      args: ['--no-sandbox']
    });

    const page = await browser.newPage();
    const path = `src/pdfs/treino-${randomUUID()}.pdf`;

    await page.setContent(body);
    await page.emulateMediaType('screen');
    await page.pdf({
      path: path,
      format: 'A4',
      printBackground: true,
    });

    console.log('done');

    await browser.close();

    return path;

  } catch (err) {
    console.log('Nosso erro', err);
  }
}


