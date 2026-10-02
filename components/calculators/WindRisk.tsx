import Link from 'next/link'
export default function WindRisk(){return <section>
  <h2>Questions for a property assessment</h2>
  <ul style={{paddingLeft:'1.3rem',margin:'1rem 0'}}>
    <li>Is there visible damage, loose flashing, or a recent leak?</li>
    <li>Are roof edges, fasteners, and penetrations part of the inspection?</li>
    <li>Which product, installation instructions, and project requirements apply?</li>
    <li>Do trees or site access affect the inspection and repair plan?</li>
  </ul>
  <p>A ZIP code cannot establish the condition or wind resistance of your roof. Ask the installer to explain the proposed assembly and attachment details for the actual building.</p>
  <p>If damage is visible, arrange a <Link href="/services/roof-repair/">roof repair assessment</Link>. For current weather information, check the <Link href="/storm-tracker/pdx-active-warnings/">Portland weather and storm resources</Link> before scheduling work.</p>
</section>}
