"""Generate modern, styled PDF for the Velvety Dawn MailFlow plan."""
import re
from datetime import date
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    PageBreak,
    PageTemplate,
    Paragraph,
    Preformatted,
    Spacer,
    Table,
    TableStyle,
    KeepTogether,
)
from reportlab.platypus.tableofcontents import TableOfContents

SRC = Path(r"C:\Users\Digital Guru\.claude\plans\i-want-to-build-velvety-dawn.md")
OUT = Path(r"c:\digital guru\webApp\mailflow\Velvety-Dawn-MailFlow-Plan.pdf")

# --- Palette (modern SaaS dark navy + indigo) ---
NAVY = colors.HexColor("#0f172a")
INDIGO = colors.HexColor("#4f46e5")
INDIGO_SOFT = colors.HexColor("#eef2ff")
SLATE = colors.HexColor("#334155")
SLATE_MUTED = colors.HexColor("#64748b")
BG_CODE = colors.HexColor("#f1f5f9")
BG_ROW = colors.HexColor("#f8fafc")
LINE = colors.HexColor("#e2e8f0")
WHITE = colors.white

# --- Styles ---
ss = getSampleStyleSheet()

style_cover_title = ParagraphStyle(
    "CoverTitle", parent=ss["Title"], fontName="Helvetica-Bold",
    fontSize=42, leading=50, textColor=WHITE, alignment=TA_CENTER, spaceAfter=18,
)
style_cover_sub = ParagraphStyle(
    "CoverSub", parent=ss["Normal"], fontName="Helvetica",
    fontSize=15, leading=22, textColor=colors.HexColor("#c7d2fe"),
    alignment=TA_CENTER, spaceAfter=8,
)
style_cover_meta = ParagraphStyle(
    "CoverMeta", parent=ss["Normal"], fontName="Helvetica",
    fontSize=11, leading=16, textColor=colors.HexColor("#94a3b8"),
    alignment=TA_CENTER,
)
style_h1 = ParagraphStyle(
    "H1", parent=ss["Heading1"], fontName="Helvetica-Bold",
    fontSize=22, leading=28, textColor=NAVY, spaceBefore=18, spaceAfter=8,
    keepWithNext=True,
)
style_h2 = ParagraphStyle(
    "H2", parent=ss["Heading2"], fontName="Helvetica-Bold",
    fontSize=16, leading=22, textColor=INDIGO, spaceBefore=14, spaceAfter=6,
    keepWithNext=True,
)
style_h3 = ParagraphStyle(
    "H3", parent=ss["Heading3"], fontName="Helvetica-Bold",
    fontSize=12.5, leading=18, textColor=SLATE, spaceBefore=10, spaceAfter=4,
    keepWithNext=True,
)
style_body = ParagraphStyle(
    "Body", parent=ss["BodyText"], fontName="Helvetica",
    fontSize=10, leading=15, textColor=SLATE, spaceAfter=6, alignment=TA_LEFT,
)
style_bullet = ParagraphStyle(
    "Bullet", parent=style_body, leftIndent=16, bulletIndent=4, spaceAfter=2,
)
style_quote = ParagraphStyle(
    "Quote", parent=style_body, leftIndent=14, textColor=SLATE_MUTED,
    fontName="Helvetica-Oblique", borderPadding=(2, 0, 2, 8),
)
style_code = ParagraphStyle(
    "Code", parent=ss["Code"], fontName="Courier",
    fontSize=8.5, leading=12, textColor=NAVY, backColor=BG_CODE,
    leftIndent=8, rightIndent=8, borderPadding=(8, 8, 8, 8),
    spaceBefore=6, spaceAfter=10,
)
style_toc_lvl0 = ParagraphStyle(
    "TOC0", fontName="Helvetica-Bold", fontSize=11, leading=18, textColor=NAVY,
    leftIndent=0, spaceBefore=2,
)
style_toc_lvl1 = ParagraphStyle(
    "TOC1", fontName="Helvetica", fontSize=10, leading=16, textColor=SLATE,
    leftIndent=14,
)

# --- Page templates ---
PAGE_W, PAGE_H = LETTER
MARGIN = 0.7 * inch


def cover_page(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(NAVY)
    canvas.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    # Accent bar
    canvas.setFillColor(INDIGO)
    canvas.rect(0, PAGE_H - 1.1 * inch, PAGE_W, 0.18 * inch, fill=1, stroke=0)
    # Small label
    canvas.setFillColor(colors.HexColor("#c7d2fe"))
    canvas.setFont("Helvetica-Bold", 10)
    canvas.drawCentredString(PAGE_W / 2, PAGE_H - 1.55 * inch, "PRODUCT ARCHITECTURE PLAN")
    canvas.restoreState()


def content_page(canvas, doc):
    canvas.saveState()
    # Header rule
    canvas.setStrokeColor(LINE)
    canvas.setLineWidth(0.5)
    canvas.line(MARGIN, PAGE_H - MARGIN + 0.25 * inch,
                PAGE_W - MARGIN, PAGE_H - MARGIN + 0.25 * inch)
    # Header text
    canvas.setFillColor(SLATE_MUTED)
    canvas.setFont("Helvetica", 8.5)
    canvas.drawString(MARGIN, PAGE_H - MARGIN + 0.35 * inch, "Velvety Dawn — MailFlow")
    canvas.drawRightString(PAGE_W - MARGIN, PAGE_H - MARGIN + 0.35 * inch,
                           "Architecture & Implementation Plan")
    # Footer rule
    canvas.setStrokeColor(LINE)
    canvas.line(MARGIN, MARGIN - 0.18 * inch, PAGE_W - MARGIN, MARGIN - 0.18 * inch)
    # Page number
    canvas.setFillColor(INDIGO)
    canvas.setFont("Helvetica-Bold", 9)
    canvas.drawRightString(PAGE_W - MARGIN, MARGIN - 0.34 * inch, f"{doc.page - 1}")
    canvas.setFillColor(SLATE_MUTED)
    canvas.setFont("Helvetica", 8.5)
    canvas.drawString(MARGIN, MARGIN - 0.34 * inch, "MailFlow · 2026")
    canvas.restoreState()


class PlanDoc(BaseDocTemplate):
    def __init__(self, filename, **kw):
        super().__init__(filename, pagesize=LETTER,
                         leftMargin=MARGIN, rightMargin=MARGIN,
                         topMargin=MARGIN, bottomMargin=MARGIN, **kw)
        cover_frame = Frame(0, 0, PAGE_W, PAGE_H, id="cover",
                            leftPadding=0, rightPadding=0,
                            topPadding=0, bottomPadding=0)
        content_frame = Frame(MARGIN, MARGIN, PAGE_W - 2 * MARGIN,
                              PAGE_H - 2 * MARGIN, id="content")
        self.addPageTemplates([
            PageTemplate(id="Cover", frames=[cover_frame], onPage=cover_page),
            PageTemplate(id="Content", frames=[content_frame], onPage=content_page),
        ])

    def afterFlowable(self, flowable):
        if isinstance(flowable, Paragraph):
            name = flowable.style.name
            text = flowable.getPlainText()
            if name == "H1":
                self.notify("TOCEntry", (0, text, self.page - 1))
            elif name == "H2":
                self.notify("TOCEntry", (1, text, self.page - 1))


# --- Markdown → Flowables (pragmatic, document-specific) ---
INLINE_CODE_RE = re.compile(r"`([^`]+)`")
BOLD_RE = re.compile(r"\*\*([^*]+)\*\*")
ITALIC_RE = re.compile(r"(?<!\*)\*([^*]+)\*(?!\*)")


def inline_md(text: str) -> str:
    # Escape XML
    text = text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
    # Bold / italic
    text = BOLD_RE.sub(r"<b>\1</b>", text)
    text = ITALIC_RE.sub(r"<i>\1</i>", text)
    # Inline code
    text = INLINE_CODE_RE.sub(
        r'<font face="Courier" color="#0f172a" backColor="#f1f5f9">\1</font>', text)
    return text


def parse_table(lines):
    rows = []
    for ln in lines:
        cells = [c.strip() for c in ln.strip().strip("|").split("|")]
        rows.append(cells)
    # rows[1] is separator
    header = rows[0]
    body = rows[2:] if len(rows) > 2 else []
    return header, body


def build_table(header, body):
    data = [[Paragraph(inline_md(c), style_body) for c in header]] + \
           [[Paragraph(inline_md(c), style_body) for c in row] for row in body]
    # Compute column widths evenly within content frame
    usable = PAGE_W - 2 * MARGIN
    n = max(len(header), 1)
    col_w = [usable / n] * n
    tbl = Table(data, colWidths=col_w, hAlign="LEFT", repeatRows=1)
    style = TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), INDIGO),
        ("TEXTCOLOR", (0, 0), (-1, 0), WHITE),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("FONTSIZE", (0, 0), (-1, 0), 9.5),
        ("BOTTOMPADDING", (0, 0), (-1, 0), 8),
        ("TOPPADDING", (0, 0), (-1, 0), 8),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LINEBELOW", (0, 0), (-1, 0), 0.75, INDIGO),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [WHITE, BG_ROW]),
        ("LINEBELOW", (0, 1), (-1, -1), 0.25, LINE),
    ])
    # Force header text color (override paragraph style)
    for i, c in enumerate(header):
        data[0][i] = Paragraph(
            f'<font color="#ffffff"><b>{inline_md(c)}</b></font>', style_body)
    tbl = Table(data, colWidths=col_w, hAlign="LEFT", repeatRows=1)
    tbl.setStyle(style)
    return tbl


def md_to_flowables(md: str):
    lines = md.splitlines()
    flow = []
    i = 0
    n = len(lines)
    while i < n:
        ln = lines[i]

        # Fenced code
        if ln.strip().startswith("```"):
            i += 1
            buf = []
            while i < n and not lines[i].strip().startswith("```"):
                buf.append(lines[i])
                i += 1
            i += 1  # skip closing fence
            code = "\n".join(buf)
            # Use a Table cell to get a soft-background block that wraps as monospace
            p = Preformatted(code, style_code)
            flow.append(p)
            continue

        # Horizontal rule
        if ln.strip() in ("---", "***", "___"):
            flow.append(Spacer(1, 4))
            t = Table([[""]], colWidths=[PAGE_W - 2 * MARGIN], rowHeights=[0.4])
            t.setStyle(TableStyle([
                ("LINEBELOW", (0, 0), (-1, -1), 0.5, LINE),
            ]))
            flow.append(t)
            flow.append(Spacer(1, 6))
            i += 1
            continue

        # Headings
        if ln.startswith("# "):
            flow.append(Paragraph(inline_md(ln[2:].strip()), style_h1))
            # Accent underline
            t = Table([[""]], colWidths=[1.2 * inch], rowHeights=[0.4])
            t.setStyle(TableStyle([("LINEBELOW", (0, 0), (-1, -1), 2.0, INDIGO)]))
            flow.append(t)
            flow.append(Spacer(1, 6))
            i += 1
            continue
        if ln.startswith("## "):
            flow.append(Paragraph(inline_md(ln[3:].strip()), style_h2))
            i += 1
            continue
        if ln.startswith("### "):
            flow.append(Paragraph(inline_md(ln[4:].strip()), style_h3))
            i += 1
            continue

        # Blockquote
        if ln.startswith("> "):
            buf = []
            while i < n and lines[i].startswith("> "):
                buf.append(lines[i][2:])
                i += 1
            flow.append(Paragraph(inline_md(" ".join(buf)), style_quote))
            continue

        # Table (must have | and next line a separator)
        if "|" in ln and i + 1 < n and re.match(r"^\s*\|?[\s\-:|]+\|?\s*$", lines[i + 1]):
            tbl_lines = [ln]
            i += 1
            while i < n and "|" in lines[i] and lines[i].strip():
                tbl_lines.append(lines[i])
                i += 1
            try:
                header, body = parse_table(tbl_lines)
                flow.append(Spacer(1, 4))
                flow.append(build_table(header, body))
                flow.append(Spacer(1, 8))
            except Exception:
                for l2 in tbl_lines:
                    flow.append(Paragraph(inline_md(l2), style_body))
            continue

        # Bulleted list
        if re.match(r"^\s*[-*]\s+", ln):
            while i < n and re.match(r"^\s*[-*]\s+", lines[i]):
                txt = re.sub(r"^\s*[-*]\s+", "", lines[i])
                flow.append(Paragraph(inline_md(txt), style_bullet, bulletText="•"))
                i += 1
            flow.append(Spacer(1, 4))
            continue

        # Ordered list
        if re.match(r"^\s*\d+\.\s+", ln):
            while i < n and re.match(r"^\s*\d+\.\s+", lines[i]):
                m = re.match(r"^\s*(\d+)\.\s+(.*)", lines[i])
                num, txt = m.group(1), m.group(2)
                flow.append(Paragraph(inline_md(txt), style_bullet,
                                      bulletText=f"{num}."))
                i += 1
            flow.append(Spacer(1, 4))
            continue

        # Blank line
        if not ln.strip():
            i += 1
            continue

        # Paragraph (collect consecutive non-special lines)
        buf = [ln]
        i += 1
        while i < n and lines[i].strip() and not (
            lines[i].startswith("#") or lines[i].startswith(">")
            or lines[i].strip().startswith("```") or "|" in lines[i]
            or re.match(r"^\s*[-*]\s+", lines[i])
            or re.match(r"^\s*\d+\.\s+", lines[i])
        ):
            buf.append(lines[i])
            i += 1
        para = " ".join(b.strip() for b in buf)
        flow.append(Paragraph(inline_md(para), style_body))

    return flow


def build():
    md = SRC.read_text(encoding="utf-8")

    doc = PlanDoc(str(OUT), title="Velvety Dawn — MailFlow Plan",
                  author="MailFlow", subject="Architecture & Implementation Plan")

    story = []

    # --- Cover ---
    story.append(Spacer(1, 2.6 * inch))
    story.append(Paragraph("Velvety Dawn", style_cover_title))
    story.append(Paragraph("MailFlow", ParagraphStyle(
        "CoverProduct", parent=style_cover_title, fontSize=28,
        textColor=colors.HexColor("#a5b4fc"), spaceAfter=40,
    )))
    story.append(Paragraph(
        "AI-Powered Multi-Account Email Outreach SaaS", style_cover_sub))
    story.append(Paragraph(
        "Architecture &amp; Implementation Plan", style_cover_sub))
    story.append(Spacer(1, 1.2 * inch))
    story.append(Paragraph(
        f"Prepared {date.today().isoformat()} &nbsp;·&nbsp; v1.0", style_cover_meta))

    # Switch to content template
    story.append(PageBreak())
    from reportlab.platypus.doctemplate import NextPageTemplate
    # Add NextPageTemplate before the PageBreak above for the switch to take effect.
    # Re-do with proper order:
    story = []
    story.append(NextPageTemplate("Content"))
    # Cover content (uses current = Cover template)
    story.insert(0, NextPageTemplate("Content"))
    # Rebuild story cleanly
    story = []
    story.append(Spacer(1, 2.6 * inch))
    story.append(Paragraph("Velvety Dawn", style_cover_title))
    story.append(Paragraph("MailFlow", ParagraphStyle(
        "CoverProduct", parent=style_cover_title, fontSize=28,
        textColor=colors.HexColor("#a5b4fc"), spaceAfter=40,
    )))
    story.append(Paragraph(
        "AI-Powered Multi-Account Email Outreach SaaS", style_cover_sub))
    story.append(Paragraph(
        "Architecture &amp; Implementation Plan", style_cover_sub))
    story.append(Spacer(1, 1.2 * inch))
    story.append(Paragraph(
        f"Prepared {date.today().isoformat()} &nbsp;·&nbsp; v1.0", style_cover_meta))
    story.append(NextPageTemplate("Content"))
    story.append(PageBreak())

    # --- Table of Contents ---
    toc = TableOfContents()
    toc.levelStyles = [style_toc_lvl0, style_toc_lvl1]
    story.append(Paragraph("Table of Contents", style_h1))
    t = Table([[""]], colWidths=[1.2 * inch], rowHeights=[0.4])
    t.setStyle(TableStyle([("LINEBELOW", (0, 0), (-1, -1), 2.0, INDIGO)]))
    story.append(t)
    story.append(Spacer(1, 10))
    story.append(toc)
    story.append(PageBreak())

    # --- Content ---
    story.extend(md_to_flowables(md))

    # Multi-build for TOC
    doc.multiBuild(story)
    print(f"Wrote {OUT}")


if __name__ == "__main__":
    build()
