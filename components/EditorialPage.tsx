import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import InlineText from '@/components/InlineText'

export interface EditorialSection { heading: string; body: string }
export default function EditorialPage({ title, description, sections, imageUrl, children }: {
  title: string; description: string; sections: EditorialSection[]; imageUrl?: string; children?: React.ReactNode
}) {
  return <>
    <Nav />
    <PageHero title={title} subtitle={description} imageUrl={imageUrl} breadcrumb={[{label:'Home',href:'/'}]} />
    <article style={{maxWidth:900,margin:'0 auto',padding:'clamp(2rem,5vw,4rem) clamp(1.5rem,4vw,3rem)',fontFamily:'var(--font-barlow)',fontSize:'1.05rem',lineHeight:1.8}}>
      {sections.map(section => <section key={section.heading} style={{marginBottom:'2.5rem'}}>
        <h2 style={{fontFamily:'var(--font-barlow-cond)',fontSize:'1.6rem',lineHeight:1.2,marginBottom:'1rem'}}>{section.heading}</h2>
        {section.body.split('\n\n').map((paragraph,i) => <p key={i} style={{marginBottom:'1rem'}}><InlineText text={paragraph} /></p>)}
      </section>)}
      {children}
    </article>
    <Footer />
  </>
}
