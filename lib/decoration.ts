import type { DecorationPage } from '@/components/services/DecorationService'

const sp = (name: string) => `/services/screen-printing/${name}.jpg`
const em = (name: string) => `/services/embroidery/${name}.jpg`

export const screenPrinting: DecorationPage = {
  eyebrow: 'Built on precision',
  title: 'Screen Printing',
  hero: sp('hero'),
  sections: [
    {
      kind: 'intro',
      title: 'Custom Screen Printing',
      paras: [
        'Screen printing is the backbone of everything we make. It’s not a side service for us — it’s a craft our production team has spent years dialing in, from the first film to the last fold.',
        'National brands, corporate programs, race teams and first-time creators all get the same thing: color-accurate, detail-rich prints at whatever scale the job calls for.',
      ],
      image: { src: sp('intro'), alt: 'Automatic screen printing presses running a production order' },
      stats: [
        { value: '20,000', label: 'prints a day of press capacity' },
        { value: '500K+', label: 'prints a month' },
      ],
    },
    {
      kind: 'cards',
      title: 'Serious Volume. No Shortcuts.',
      sub: 'A production workflow built for speed, consistency and control from art file to finished box.',
      items: [
        { title: 'Automatic ROQ Presses', body: 'Industry-leading automatic presses built for precision registration and high-volume runs.', image: sp('cap-presses') },
        { title: 'PMS Matching + Custom Ink', body: 'Inks mixed to your Pantone so your brand color is the same on every order and every reorder.', image: sp('cap-ink') },
        { title: 'Specialty Inks & Finishes', body: 'Puff, metallic, tonal and soft-hand inks when a standard print isn’t enough.', image: sp('cap-specialty') },
        { title: 'Pre-Press, Inspection & Finishing', body: 'Art prep, screen burning, quality checks and finishing handled in-house, start to finish.', image: sp('cap-prepress') },
        { title: 'Ready For National Programs', body: 'Set up to carry large corporate programs, retail brands and multi-location rollouts.', image: sp('cap-programs') },
        { title: 'High-Volume Capability', body: 'Up to 20,000 prints a day with a typical turnaround of 7 to 10 business days.', image: sp('cap-volume') },
      ],
    },
    {
      kind: 'feature',
      title: 'Details Are Everything',
      paras: [
        'Every piece that leaves production carries our name, and our standard with it. Corporate program or passion project, the priorities don’t change: craftsmanship, consistency and precision.',
        'Each item is inspected, color-matched and made with intention, so what you pictured is exactly what you hold.',
      ],
      image: { src: sp('details'), alt: 'A printer pulling a finished shirt off the press' },
    },
    {
      kind: 'cards',
      title: 'Who We Print For',
      sub: 'From national brands to independent creators, the standard stays the same — only the scale changes.',
      items: [
        { title: 'Corporate & Uniform Programs', body: 'The same shirt, in the same color, on the same schedule, year after year. Your screens and ink formulas stay on file, so a reorder eighteen months out matches the first run.', image: sp('who-corporate') },
        { title: 'Restaurants & Hospitality', body: 'Front-of-house and kitchen apparel for restaurants, clubs and resorts, printed to survive daily wear and commercial laundering.', image: sp('who-restaurants') },
        { title: 'Schools, Teams & Clubs', body: 'Spirit wear, team uniforms and fundraiser runs, with print sizes scaled from youth through adult so the graphic sits right on every shirt.', image: sp('who-schools') },
        { title: 'Events & Fundraisers', body: 'Tournament tees, race shirts, festival merch and charity runs. Give us your in-hands date up front and we build the schedule around it.', image: sp('who-events') },
        { title: 'Retail & Merch Brands', body: 'Private-label programs with tagless prints, custom labels, hang tags and polybagging, finished to ship straight to a shelf or a customer’s door.', image: sp('who-retail') },
        { title: 'Safety & Jobsite Apparel', body: 'Hi-vis shirts and workwear for crews and field teams, printed so the logo stays legible after months on site.', image: sp('who-safety') },
      ],
      note: 'Orders ship nationwide, with fulfillment programs for brands selling direct to customers.',
    },
    {
      kind: 'gallery',
      title: 'Explore Our Screen Printing Work',
      images: [
        { src: sp('work-1'), alt: 'Printed motocross tee' },
        { src: sp('work-2'), alt: 'Full-color trucking company print' },
        { src: sp('who-corporate'), alt: 'Independence Day tees on the dryer' },
        { src: sp('cap-programs'), alt: 'Corporate employee network tee on the press' },
      ],
    },
  ],
  faqTitle: 'Screen Printing FAQs',
  faqs: [
    { q: 'What is your minimum order for screen printing?', a: 'Custom screen printing programs start at 50 pieces, and you can combine printing with embroidery and DTF to reach that total. Need fewer? Our online shop prints single items from 12 pieces.' },
    { q: 'How long does a screen printing order take?', a: 'Typical turnaround is 7 to 10 business days from artwork and order approval. Have a hard in-hands date for an event or launch? Tell us up front and we’ll confirm it before production starts.' },
    { q: 'Can you match my brand’s exact colors?', a: 'Yes. We match PMS colors and mix custom inks, so your brand colors stay consistent across every run and reorder. No PMS reference? We can match from a physical sample or an existing garment.' },
    { q: 'What garments can you print on?', a: 'Tees, hoodies, crewnecks, performance wear, totes and more. Send your own garments or let us source them, from budget blanks to premium retail brands.' },
    { q: 'Do you handle large corporate or national programs?', a: 'Yes. Production runs automatic ROQ presses with capacity for up to 20,000 prints a day and over 500,000 a month, including private-label finishing and fulfillment for national rollouts.' },
    { q: 'Can I see a proof before you print?', a: 'Always. Every order gets a digital proof for approval before screens are burned. Nothing goes to press until you sign off.' },
  ],
}

export const embroidery: DecorationPage = {
  eyebrow: 'Stitched to perfection',
  title: 'Embroidery',
  hero: em('hero'),
  sections: [
    {
      kind: 'intro',
      title: 'Custom Embroidery',
      paras: [
        'Embroidery is where texture, detail and real craftsmanship meet.',
        'Every logo is digitized in-house, prepped with care, stitched on multi-head machines and inspected until it meets the standard we put our name on.',
        'That’s the difference between decorated apparel and something people actually want to wear.',
      ],
      image: { src: em('intro'), alt: 'Multi-head embroidery machines with finished garments' },
    },
    {
      kind: 'cards',
      title: 'Our Capabilities',
      sub: 'Our team watches over your production at every step.',
      cols: 4,
      items: [
        { title: 'Barudan Multi-Head Machines', body: 'The same class of equipment premium headwear makers run, for precise, high-volume embroidery with sharp detail.', image: em('cap-machines') },
        { title: 'Custom Hats & Caps', body: 'Structured caps, 3D puff, chenille and custom patches, run on cap frames so the logo stays centered on a curved front.', image: em('cap-hats') },
        { title: 'In-House Digitizing + Sew-Outs', body: 'Full control from artwork to approved sample, so every stitch file is production-ready before the run starts.', image: em('cap-digitizing') },
        { title: 'Direct-To-Customer Or Bulk', body: 'Ship it all to one door, split it across locations, or fulfill orders straight to your customers.', image: em('cap-shipping') },
      ],
    },
    {
      kind: 'feature',
      title: 'Thread By Thread, Built To Last',
      paras: [
        'Great embroidery has weight to it — tactile, premium and made to hold up. That’s the intent behind every piece.',
        'Corporate apparel, hospitality uniforms or a lifestyle brand drop: clean alignment, specialty textures and color that stays consistent across every garment in the run.',
      ],
      image: { src: em('thread'), alt: 'A logo being stitched in an embroidery hoop' },
      flip: true,
    },
    {
      kind: 'gallery',
      title: 'Explore Our Embroidery Work',
      images: [
        { src: em('work-4'), alt: 'Motorsports Curated rope cap, embroidered' },
        { src: em('work-2'), alt: '23XI Racing logo embroidered on a black work shirt' },
        { src: em('work-3'), alt: 'Golf tournament rope cap, embroidered' },
        { src: em('work-1'), alt: 'Chinola logo embroidered in full color' },
      ],
    },
    {
      kind: 'list',
      title: 'What We Embroider',
      sub: 'Anything that can be hooped or run on a cap frame. What changes from piece to piece is the backing, the needle and how the stitch file is built — not just where the logo goes.',
      items: [
        { title: 'Polos and button-downs', body: 'Our most ordered embroidered garment by a wide margin. Performance, pique and blends, left chest as standard with optional sleeve or nape marks.' },
        { title: 'Chef coats, aprons and hospitality', body: 'Kitchen and front-of-house pieces that get commercially laundered several times a week, stitched in polyester thread so bleach doesn’t fade them.' },
        { title: 'Caps and headwear', body: 'Structured caps, dad hats, truckers, beanies and visors on cap frames. 3D puff, chenille and patches all live here.' },
        { title: 'Workwear and trade apparel', body: 'Heavyweight canvas from Carhartt and similar brands, plus hi-vis where the logo can never cover the reflective tape.' },
        { title: 'Jackets and outerwear', body: 'Softshells, quarter-zips, fleece and rain shells. Heavier and lined pieces get different backing, and lined jackets are hooped so the lining never gets caught.' },
        { title: 'Bags, towels and accessories', body: 'Totes, duffels, backpacks, blankets and towels. Flat panels take a bigger mark than a chest logo, which makes them great for gifting and event kits.' },
      ],
    },
    {
      kind: 'feature',
      title: 'What Digitizing Is, And Why We Do It',
      paras: [
        'Embroidery machines don’t read a logo. They read a stitch file: instructions for every needle penetration, in what order and direction, with the underlay that holds the fabric flat. Building that file is called digitizing, and it decides whether embroidery looks sharp or homemade.',
        'Plenty of shops send logos overseas and run whatever comes back. We digitize in-house, which matters on the jobs that go wrong elsewhere — tiny text, gradients that have to become solid thread, detailed crests and thin script strokes. If a sew-out isn’t right, we fix the file the same day.',
        'Most company logos land between 5,000 and 12,000 stitches on a left chest. If simplifying one detail would save real money without hurting the mark, we’ll tell you before the run, not after.',
      ],
      image: { src: em('digitizing'), alt: 'Close-up of a logo stitching in a hoop' },
    },
    {
      kind: 'list',
      title: 'Thread, Placement And Backing',
      items: [
        { title: 'Polyester thread as standard', body: 'Bleach-resistant and colorfast through industrial washing. Rayon has more sheen and works for retail and gifting, but anything worn to work gets polyester.' },
        { title: 'Backing chosen for the fabric', body: 'Cutaway under knits and performance fabric because they stretch, tearaway under stable wovens, and a topping on fleece and pique so stitches sit on the surface.' },
        { title: 'Left chest, measured not guessed', body: 'Centered roughly 7.5 to 9 inches down from the shoulder and 4 to 6 inches off center at about 3.5 inches wide — measured on every size, not eyeballed once and repeated.' },
        { title: 'Tonal and specialty finishes', body: 'Thread matched to the garment for a quiet, high-end look. 3D puff to lift a cap logo. Chenille and appliqué to cover big areas faster and cheaper than dense fill.' },
        { title: 'Sleeve, nape and back', body: 'A second mark for a partner brand, certification, division or location. A small logo under the collar reads as a retail detail rather than a uniform.' },
        { title: 'Color matching', body: 'Thread comes in a fixed palette, so we match to the closest thread to your brand color and record it. We’ll tell you up front if a color can’t be hit exactly.' },
      ],
    },
    {
      kind: 'list',
      title: 'Who We Embroider For',
      items: [
        { title: 'Companies and professional services', body: 'Client-facing teams, offices and multi-location employers running a standing uniform program.' },
        { title: 'Marine, charter and clubs', body: 'Long-sleeve performance shirts and caps for boat clubs, charters and watersports crews, built for salt air.' },
        { title: 'Restaurants and hospitality', body: 'Server polos, chef coats and management pieces built for the wash cycle, not just the photo shoot.' },
        { title: 'Real estate and retail', body: 'Agents, open houses and storefront teams, where the polo does as much brand work as uniform work.' },
        { title: 'Contractors and trades', body: 'Supervisors, estimators and anyone walking into a customer’s home. Performance fabric, company colors, name on the right chest.' },
        { title: 'Race teams and brands', body: 'Team shirts, pit crew gear and embroidered caps for race programs and clothing brands, with neck labels, hang tags and polybagging handled in finishing.' },
      ],
    },
    {
      kind: 'feature',
      title: 'Ordering Embroidery',
      paras: [
        'Custom embroidery starts at 24 pieces, and you can mix it with printed items in one order to reach your total. Most companies don’t need forty polos — they need eighteen polos, a dozen caps and a few jackets with the same logo, arriving together.',
        'Turnaround is 7 to 10 business days once artwork and garments are approved. A brand-new logo adds a digitizing and sew-out approval step, so allow a little extra the first time.',
        'After that your stitch file, thread colors, garments and placement stay on file, so a reorder repeats a recorded setup instead of reinterpreting your logo.',
      ],
      image: { src: em('ordering'), alt: 'Embroidered club logo on a navy shirt' },
      flip: true,
    },
  ],
  faqTitle: 'Embroidery FAQs',
  faqs: [
    { q: 'What is your minimum order for embroidery?', a: 'Custom embroidery programs start at 24 pieces, and you can mix embroidery, DTF and screen printing to reach your total. Our online shop embroiders single items from 8 pieces.' },
    { q: 'What is the difference between embroidery and screen printing?', a: 'Embroidery stitches your design into the fabric with thread for a raised, premium finish that lasts the life of the garment — the right call for caps, polos, jackets and uniforms. Screen printing pushes ink onto the fabric and is better for big, colorful graphics and high-volume tees and hoodies.' },
    { q: 'Do you charge extra for digitizing?', a: 'Logo setup and digitizing are included on our shop orders. On larger custom programs we quote it up front. Either way it’s done in-house, so we can adjust the file until the sew-out is right.' },
    { q: 'What items can you embroider?', a: 'Caps and headwear, polos, button-downs, jackets, fleece, bags and workwear — including structured caps and tricky placements many shops turn away.' },
    { q: 'Do you offer 3D puff, appliqué, chenille and patches?', a: 'Yes, all four. 3D puff adds dimension to headwear, appliqué and chenille suit varsity looks, and custom patches work on jackets, bags and uniform programs.' },
    { q: 'How long does an embroidery order take?', a: 'Typical turnaround is 7 to 10 business days once artwork is approved. First-time logos include a digitizing and sample approval step, so build in a little extra time.' },
  ],
}
