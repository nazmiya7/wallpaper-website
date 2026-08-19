import os, subprocess, json, re

catalogs = {
    "rimal_budget_collection_n": "file_collections/rimal_budget_collection_n.pdf",
    "adams_rimal": "file_collections/adams_rimal.pdf",
    "rimal_emaar_n": "file_collections/rimal_emaar_n.pdf",
    "malacca_n": "file_collections/malacca_n.pdf",
    "aura_design": "file_collections/aura_design.pdf",
    "rimona_pdf": "file_collections/rimona_pdf.pdf",
    "rimal_wallcovering_n": "file_collections/rimal_wallcovering_n.pdf",
}

# Load existing metadata
with open('js/page_metadata.js', 'r') as f:
    content = f.read()
existing = {}
try:
    json_str = content.replace('const PAGE_METADATA = ', '').rstrip(';\n')
    existing = json.loads(json_str)
except: pass

# For Adams Rimal: extract P-XX and code pattern
def extract_adams(text_pages):
    result = {}
    for i, page_text in enumerate(text_pages):
        page_num = i + 1
        # Pattern: P-01\nMS170204
        pno_match = re.search(r'P-?(\d+)', page_text)
        # Find product code - anything like MS170204, MV151206, ML110117, etc.
        code_match = re.search(r'\b([A-Z]{2,3}[\s-]?\d{5,8})\b', page_text)
        if pno_match or code_match:
            result[page_num] = {
                'code': code_match.group(1).strip() if code_match else None,
                'pno': pno_match.group(1) if pno_match else None
            }
    return result

def extract_budget(text_pages):
    result = {}
    for i, page_text in enumerate(text_pages):
        page_num = i + 1
        code_match = re.search(r'\b([A-Z]{1,3}[\s-]?\d{5,8})\b', page_text)
        pno_match = re.search(r'P\.?No\.?\s*:?\s*(\d+)', page_text, re.I)
        if code_match or pno_match:
            result[page_num] = {
                'code': code_match.group(1).strip() if code_match else None,
                'pno': pno_match.group(1) if pno_match else None
            }
    return result

for cat_id, pdf_path in catalogs.items():
    if not os.path.exists(pdf_path):
        print(f"Skipping {cat_id}: file not found")
        continue
    if cat_id in ['aura_design', 'rimona_pdf']:
        print(f"Skipping {cat_id}: already has good metadata")
        continue
    
    result = subprocess.run(['pdftotext', pdf_path, '-'], capture_output=True, text=True)
    pages = result.stdout.split('\f')
    print(f"\n=== {cat_id} ({len(pages)} pages) ===")
    
    if cat_id == 'adams_rimal':
        new_meta = extract_adams(pages)
    else:
        new_meta = extract_budget(pages)
    
    if new_meta:
        print(f"  Found {len(new_meta)} pages with data")
        for p, v in list(new_meta.items())[:5]:
            print(f"  Page {p}: {v}")
        existing[cat_id] = new_meta
    else:
        print("  No data found")

with open('js/page_metadata.js', 'w') as f:
    f.write("const PAGE_METADATA = " + json.dumps(existing, indent=2) + ";\n")
print("\nDone: updated js/page_metadata.js")
