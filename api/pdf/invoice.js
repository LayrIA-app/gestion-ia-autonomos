import { jsPDF } from 'jspdf'

/* POST /api/pdf/invoice
   Body: { numero, cliente, concepto, fecha, base, iva, irpf, total, emisor }
   Returns: application/pdf · PDF binary de factura lista para descargar o adjuntar. */

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { numero = 'F-TMP', cliente = 'Cliente', concepto = '', fecha = '', base = 0, iva = 0, irpf = 0, total = 0, emisor = { nombre: 'Iker Arrieta · Arrieta Consultores', nif: 'B-12345678', direccion: 'Donostia · Gipuzkoa', email: 'iker@arrietaconsultores.com' } } = req.body || {}

  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  const navy = [28, 45, 68]
  const cream = [250, 247, 242]

  // Header navy strip
  doc.setFillColor(...navy)
  doc.rect(0, 0, 210, 38, 'F')
  doc.setTextColor(...cream)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(22)
  doc.text('FACTURA', 15, 22)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.text(numero, 15, 30)

  // Emisor
  doc.setTextColor(...navy)
  doc.setFontSize(9)
  doc.text(emisor.nombre, 140, 12)
  doc.text('NIF: ' + emisor.nif, 140, 17)
  doc.text(emisor.direccion, 140, 22)
  doc.text(emisor.email, 140, 27)

  // Cliente + fecha
  doc.setFontSize(8)
  doc.setTextColor(120, 120, 120)
  doc.text('FACTURAR A', 15, 52)
  doc.text('FECHA', 140, 52)
  doc.setFontSize(11)
  doc.setTextColor(...navy)
  doc.setFont('helvetica', 'bold')
  doc.text(cliente, 15, 58)
  doc.setFont('helvetica', 'normal')
  doc.text(fecha, 140, 58)

  // Línea separadora
  doc.setDrawColor(220, 220, 220)
  doc.line(15, 70, 195, 70)

  // Tabla concepto
  doc.setFontSize(8)
  doc.setTextColor(120, 120, 120)
  doc.text('CONCEPTO', 15, 80)
  doc.text('IMPORTE', 180, 80, { align: 'right' })
  doc.setFontSize(11)
  doc.setTextColor(...navy)
  doc.text(concepto || 'Servicios de consultoría', 15, 88)
  doc.text(fmt(base), 180, 88, { align: 'right' })

  // Totales
  doc.line(15, 100, 195, 100)
  let y = 110
  doc.setFontSize(10)
  const rows = [
    ['Base imponible', fmt(base)],
    ['IVA (21%)', fmt(iva)],
    ['IRPF (-15%)', '-' + fmt(irpf)],
  ]
  for (const [lbl, val] of rows) {
    doc.setTextColor(100, 100, 100)
    doc.text(lbl, 140, y)
    doc.setTextColor(...navy)
    doc.text(val, 180, y, { align: 'right' })
    y += 6
  }
  // Total final box
  doc.setFillColor(...navy)
  doc.rect(135, y + 2, 60, 12, 'F')
  doc.setTextColor(...cream)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  doc.text('TOTAL', 140, y + 10)
  doc.text(fmt(total), 190, y + 10, { align: 'right' })

  // Footer
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.setTextColor(160, 160, 160)
  doc.text('Generada por Tu gestión IA · COAXIONIA · ' + new Date().toISOString().split('T')[0], 15, 285)

  const buffer = doc.output('arraybuffer')
  res.setHeader('Content-Type', 'application/pdf')
  res.setHeader('Content-Disposition', `attachment; filename="${numero}.pdf"`)
  res.status(200).send(Buffer.from(buffer))
}

function fmt(n) {
  const v = typeof n === 'number' ? n : Number(String(n).replace(/[^\d.-]/g, '')) || 0
  return v.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €'
}
