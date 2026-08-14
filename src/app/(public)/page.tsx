import { Container } from "@/components/ui/Container";
import { HeroSlider } from "@/components/home/HeroSlider";
import { MassScheduleSection } from "@/components/home/MassScheduleSection";
import { LatestArticlesSection } from "@/components/home/LatestArticlesSection";
import { AnnouncementSection } from "@/components/home/AnnouncementSection";
import { LiturgicalTodayCard } from "@/components/home/LiturgicalTodayCard";
import { WelcomeModal } from "@/components/home/WelcomeModal";
import {
  getHeroSlides,
  getAllMassSchedules,
  getLatestArticles,
  getLatestAnnouncements,
  getWelcomeSlides,
} from "@/lib/queries";
import { getEffectiveToday } from "@/lib/liturgical-effective";

export const revalidate = 300;

export default async function HomePage() {
  const [slides, schedules, articles, announcements, liturgicalDay, welcomeSlides] =
    await Promise.all([
      getHeroSlides(),
      getAllMassSchedules(),
      getLatestArticles(6),
      getLatestAnnouncements(3),
      getEffectiveToday(),
      getWelcomeSlides(),
    ]);

  return (
    <div className="pb-24">
      <WelcomeModal slides={welcomeSlides} />
      <HeroSlider slides={slides} />

      <Container className="mt-10 space-y-20">
        {liturgicalDay && <LiturgicalTodayCard day={liturgicalDay} />}

        <MassScheduleSection schedules={schedules} />
        <AnnouncementSection announcements={announcements} />
        <LatestArticlesSection articles={articles} />
      </Container>
    </div>
  );
}
