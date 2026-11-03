import { redirect } from 'next/navigation';

export default function MembershipPage() {
  redirect('/members?tab=join');
}
