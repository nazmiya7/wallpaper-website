import os
import subprocess
import json
import re

catalogs = [
    "rimal_budget_collection_n", "adams_rimal", "rimal_emaar_n",
    "malacca_n", "aura_design", "Screenshot_2025-07-02_at_9.05.17_PM",
    "rimona_pdf", "rimal_wallcovering_n"
]

metadata = {}

for cat in catalogs:
    pdf_path = f"file_collections/{cat}.pdf"
    if not os.path.exists(pdf_path):
        continue
    
    metadata[cat] = {}
    
    # Extract text from all pages
    # -f 1 (first page), -l (last page is determined automatically, or just extract all)
    result = subprocess.run(["pdftotext", pdf_path, "-"], capture_output=True, text=True)
    
    # Split by form-feed (which pdftotext uses to separate pages)
    pages = result.stdout.split('\f')
    
    for i, page_text in enumerate(pages):
        page_num = i + 1
        
        # Try to find LP number
        lp_match = re.search(r'LP\s*\d+', page_text)
        m_match = re.search(r'M\s*\d+', page_text)
        pattern_match = re.search(r'Pattern No\s*\n+.*?([A-Z0-9\s-]+)', page_text, re.IGNORECASE)
        
        # Find page number text
        pno_match = re.search(r'P\.No\s*:\s*(\d+)', page_text)
        pageno_match = re.search(r'Page No\s+(\d+)', page_text)
        
        code = None
        pno = None
        
        if lp_match:
            code = lp_match.group(0).replace(' ', '') # LP261709
        elif m_match:
            code = m_match.group(0).replace(' ', '')
        elif pattern_match:
            # this might be messy, take the first line after Pattern No
            lines = [l.strip() for l in page_text.split('\n') if l.strip()]
            for j, line in enumerate(lines):
                if 'Pattern No' in line and j + 1 < len(lines):
                    # Skip 'Luxury Design' if it's there
                    nxt = lines[j+1]
                    if 'Luxury Design' in nxt and j + 2 < len(lines):
                        nxt = lines[j+2]
                    code = nxt
                    break
                    
        if pno_match:
            pno = pno_match.group(1)
        elif pageno_match:
            pno = pageno_match.group(1)
            
        if code or pno:
            metadata[cat][page_num] = {"code": code, "pno": pno}

with open('js/page_metadata.js', 'w') as f:
    f.write("const PAGE_METADATA = " + json.dumps(metadata, indent=2) + ";\n")

print("Generated js/page_metadata.js")
