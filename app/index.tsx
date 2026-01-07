// app/index.tsx
import { Redirect } from 'expo-router';

export default function Index() {
  // Проверяем в браузере, создан ли уже гиппопотам
  if (typeof window !== 'undefined') {
    const hippoName = localStorage.getItem('hippoName');
    const hasCreatedHippo = localStorage.getItem('hasCreatedHippo');

    // Если гиппопотам уже создан (есть имя или флаг) - идем на главную
    if (hippoName || hasCreatedHippo === 'true') {
      return <Redirect href="/(tabs)" />;
    }
  }

  // По умолчанию - на онбординг
  return <Redirect href="/onboarding" />;
}