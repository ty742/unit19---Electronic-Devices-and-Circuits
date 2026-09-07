"""
Converts forms-guide.md into an optimized PDF for Microsoft Forms "Quick Import".
Eliminates duplicate section title lines and optimizes heading structure
so Microsoft Forms parser detects question types and sections seamlessly.
"""

import re
import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, HRFlowable
)

def create_forms_pdf(md_path, pdf_path):
    with open(md_path, 'r', encoding='utf-8') as f:
        text = f.read()

    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=letter,
        rightMargin=45,
        leftMargin=45,
        topMargin=45,
        bottomMargin=45
    )

    styles = getSampleStyleSheet()
    
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=18,
        leading=22,
        textColor=colors.HexColor('#005a70'),
        spaceAfter=4
    )
    
    subtitle_style = ParagraphStyle(
        'DocSubTitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=11,
        leading=15,
        textColor=colors.HexColor('#475569'),
        spaceAfter=14
    )

    section_style = ParagraphStyle(
        'SectionHeader',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=17,
        textColor=colors.HexColor('#00797e'),
        spaceBefore=14,
        spaceAfter=6,
        keepWithNext=True
    )

    q_num_style = ParagraphStyle(
        'QuestionTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10.5,
        leading=14,
        textColor=colors.HexColor('#0f172a'),
        spaceBefore=8,
        spaceAfter=3,
        keepWithNext=True
    )

    q_meta_style = ParagraphStyle(
        'QuestionMeta',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=9,
        leading=12,
        textColor=colors.HexColor('#64748b'),
        leftIndent=12,
        spaceAfter=3
    )

    option_style = ParagraphStyle(
        'OptionLine',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13,
        textColor=colors.HexColor('#334155'),
        leftIndent=16,
        spaceAfter=2
    )

    body_style = ParagraphStyle(
        'BodyDark',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13,
        textColor=colors.HexColor('#334155'),
        spaceAfter=4
    )

    story = []

    story.append(Paragraph("Unit 19: Electronic Devices & Circuits", title_style))
    story.append(Paragraph("Week 1 Deliverables Form (PoE A01) — Microsoft Forms Import Template", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor('#00979d'), spaceBefore=2, spaceAfter=12))

    lines = text.split('\n')
    in_settings = False
    seen_section = None

    for line in lines:
        line_clean = line.strip()
        if not line_clean:
            continue

        if line_clean.startswith('# ') or line_clean.startswith('## Unified Student'):
            continue

        # Configuration settings section
        if 'Form Configuration Settings' in line_clean:
            in_settings = True
            story.append(Paragraph("<b>⚙️ Form Configuration Settings (For Form Owner):</b>", section_style))
            continue
        
        if in_settings:
            if line_clean.startswith('---') or line_clean.startswith('## 📋'):
                in_settings = False
            else:
                formatted = line_clean.replace('- **', '• <b>').replace('**: `', '</b>: <code>').replace('`', '</code>')
                story.append(Paragraph(formatted, body_style))
                continue

        # Skip duplicate section line
        if line_clean.startswith('### Form Section Header:'):
            continue

        # Section Header
        if line_clean.startswith('## 📋 Section') or line_clean.startswith('**Section '):
            sec_title = line_clean.replace('## 📋 ', '').replace('**', '').strip()
            if sec_title == seen_section:
                continue
            seen_section = sec_title
            story.append(Spacer(1, 8))
            story.append(HRFlowable(width="100%", thickness=0.8, color=colors.HexColor('#cbd5e1'), spaceBefore=6, spaceAfter=6))
            story.append(Paragraph(f"<b>{sec_title}</b>", section_style))
            continue

        if line_clean.startswith('> *'):
            desc = line_clean.replace('> *', '').replace('*', '').strip()
            story.append(Paragraph(f"<i>{desc}</i>", q_meta_style))
            continue

        # Numbered Questions
        match_q = re.match(r'^(\d+)\.\s+\*\*(.+?)\*\*', line_clean)
        if match_q:
            q_num = match_q.group(1)
            q_text = match_q.group(2)
            story.append(Paragraph(f"<b>{q_num}. {q_text}</b>", q_num_style))
            continue

        # Question metadata (Type, Prompt, Required)
        if line_clean.startswith('- *Type*:'):
            q_type = line_clean.replace('- *Type*:', '').strip()
            story.append(Paragraph(f"<b>Type:</b> {q_type}", q_meta_style))
            continue
        elif line_clean.startswith('- *Prompt*:'):
            prompt = line_clean.replace('- *Prompt*:', '').strip()
            story.append(Paragraph(f"<b>Prompt:</b> {prompt}", q_meta_style))
            continue
        elif line_clean.startswith('- *Required*:'):
            req = line_clean.replace('- *Required*:', '').strip()
            story.append(Paragraph(f"<b>Required:</b> {req}", q_meta_style))
            continue
        elif line_clean.startswith('- *File limit*:'):
            flim = line_clean.replace('- *File limit*:', '').strip()
            story.append(Paragraph(f"<b>File Limit:</b> {flim}", q_meta_style))
            continue
        elif line_clean.startswith('- *Max size*:'):
            msz = line_clean.replace('- *Max size*:', '').strip()
            story.append(Paragraph(f"<b>Max Size:</b> {msz}", q_meta_style))
            continue

        # Options
        if line_clean.startswith('- [ ]') or line_clean.startswith('[ ]'):
            opt = line_clean.replace('- [ ]', '').replace('[ ]', '').strip()
            story.append(Paragraph(f"[  ]  {opt}", option_style))
            continue

    doc.build(story)
    print(f"Successfully generated clean PDF: {pdf_path}")

if __name__ == '__main__':
    src = '/home/tayo/projects/work/unit19/week1/forms-guide.md'
    dest = '/home/tayo/projects/work/unit19/week1/Week-01-PoE-A01-Microsoft-Forms-Import.pdf'
    create_forms_pdf(src, dest)
