import { useTranslation } from 'react-i18next';
import { portfolioData } from '@/data/portfolio';

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <>
      <section className="page-intro section-block" id="about">
        <p className="section-kicker">03 / {t('sections.about')}</p>
        <h1 className="page-title">{t('pages.about.title')}</h1>
        <p className="body-copy page-lede">{t('pages.about.introduction')}</p>
      </section>

      <section className="section-block about-grid">
        <div>
          <div className="section-heading">
            <p className="section-kicker">{t('sections.about')}</p>
          </div>
          <p className="body-copy about-copy">{t('hero.introduction')}</p>
        </div>
        <div>
          <div className="section-heading">
            <p className="section-kicker">{t('sections.skills')}</p>
          </div>
          <div className="skill-groups">
            {portfolioData.skills.map((group) => (
              <div className="skill-group" key={group.id}>
                <p className="skill-group-title">
                  {t(`skillGroups.${group.id}`)}
                </p>
                <p className="skill-items">{group.items.join(' · ')}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block education-block">
        <div className="section-heading">
          <p className="section-kicker">04 / {t('sections.education')}</p>
        </div>
        <div className="education-content">
          <h2 className="subheading">{t('education.degree')}</h2>
          <p className="education-institution">{t('education.institution')}</p>
          <p className="section-kicker coursework-label">
            {t('labels.coursework')}
          </p>
          <ul className="coursework-list">
            {portfolioData.education.coursework.map((course) => (
              <li key={course}>{t(`education.coursework.${course}`)}</li>
            ))}
          </ul>
        </div>
      </section>

      <footer className="site-footer">
        <span>{portfolioData.person.name}</span>
        <span>© {new Date().getFullYear()}</span>
      </footer>
    </>
  );
}
