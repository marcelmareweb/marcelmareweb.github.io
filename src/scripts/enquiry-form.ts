import { enquiryInterests } from '../lib/contact';

document.querySelectorAll<HTMLFormElement>('[data-inquiry-form]').forEach((form) => {
  const status = form.querySelector<HTMLElement>('[data-inquiry-status]')!;
  const confirmation = form.querySelector<HTMLElement>('[data-inquiry-confirmation]')!;
  const fallback = form.querySelector<HTMLAnchorElement>('[data-email-fallback]')!;
  const submit = form.querySelector<HTMLButtonElement>('[data-submit-button]')!;
  const submitLabel = submit.innerHTML;
  const engagement = form.querySelector<HTMLSelectElement>('#inquiry-engagement')!;
  const moduleSelect = form.querySelector<HTMLSelectElement>('[data-course-module-value]')!;
  const daySelect = form.querySelector<HTMLSelectElement>('[data-programme-day]')!;
  const attendance = form.querySelector<HTMLSelectElement>('[data-attendance]')!;
  const programme = form.querySelector<HTMLInputElement>('[data-programme-value]')!;
  const contextCard = form.querySelector<HTMLElement>('[data-enquiry-context]')!;
  const contextText = form.querySelector<HTMLElement>('[data-module-status]')!;
  const returnLink = form.querySelector<HTMLAnchorElement>('[data-context-return]')!;
  const params = new URLSearchParams(location.search);
  const knownOrigins = [
    '/',
    '/services',
    '/learning',
    '/work',
    '/workshops',
    '/courses',
    '/about',
    '/thinking',
    '/workshops/strategic-design-leadership',
    '/cases/policy-analyst-strategic-review',
    '/cases/creative-x-ai-workshop',
    '/thinking/strategic-decision-maps/strategy-illusion',
  ];
  const proposedOrigin = (params.get('source') ?? '').replace(/\/$/, '') || '/';
  const origin =
    params.has('source') && knownOrigins.includes(proposedOrigin)
      ? proposedOrigin
      : location.pathname;
  const interest = () => enquiryInterests.find((item) => item.value === engagement.value);
  const selectedDay = () => daySelect.selectedOptions[0];
  const selectedModule = () => moduleSelect.selectedOptions[0];

  function updateContext() {
    const item = interest();
    const isProgramme = item?.id === 'masterclass';
    const isCourse = item?.id === 'course';
    form.querySelector<HTMLElement>('[data-programme-day-field]')!.hidden = !isProgramme;
    form.querySelector<HTMLElement>('[data-attendance-field]')!.hidden = !isProgramme;
    form.querySelector<HTMLElement>('[data-course-module-field]')!.hidden = !isCourse;
    if (!isProgramme) {
      daySelect.value = '';
      attendance.value = '';
    }
    if (!isCourse) moduleSelect.value = '';
    programme.value = isProgramme ? (programme.dataset.programmeTitle ?? '') : '';
    const parts: string[] = item ? [item.label] : [];
    if (daySelect.value) parts.push(selectedDay().textContent?.trim() ?? '');
    if (moduleSelect.value) parts.push(selectedModule().textContent?.trim() ?? '');
    if (attendance.value)
      parts.push(
        attendance.value === 'individual' ? 'Individual attendance enquiry' : 'Team enquiry',
      );
    contextText.textContent = parts.join(' · ');
    contextCard.hidden = !item;
    const serviceSections: Record<string, string> = {
      'strategic-decision': 'strategic-decision-design',
      'behavioural-design': 'behavioural-design',
      'human-ai': 'human-ai-decision-design',
    };
    let href = '/services/';
    if (item && serviceSections[item.id]) href += '#' + serviceSections[item.id];
    if (item?.id === 'workshop') href = '/workshops';
    if (isProgramme)
      href =
        '/workshops/strategic-design-leadership/' +
        (daySelect.value ? '#session-' + daySelect.value : '');
    if (isCourse)
      href = '/courses' + (moduleSelect.value ? '?module=' + moduleSelect.value + '#syllabus' : '');
    returnLink.href = href;
    returnLink.textContent = isProgramme
      ? 'Back to the programme'
      : isCourse
        ? 'Back to the learning case'
        : 'Back to the offering';
  }

  const moduleNumber = (params.get('module') ?? '').padStart(2, '0');
  const initial =
    enquiryInterests.find((item) => item.id === params.get('interest')) ??
    (/^0[1-6]$/.test(moduleNumber)
      ? enquiryInterests.find((item) => item.id === 'course')
      : undefined) ??
    (params.get('focus') === 'workshops'
      ? enquiryInterests.find((item) => item.id === 'workshop')
      : undefined) ??
    enquiryInterests.find((item) => item.id === form.dataset.defaultInterest);
  if (initial) engagement.value = initial.value;
  if (/^0[1-6]$/.test(moduleNumber)) moduleSelect.value = moduleNumber;
  const day = params.get('day');
  if (day && [...daySelect.options].some((option) => option.value === day)) daySelect.value = day;
  const audience = params.get('audience');
  if (audience === 'individual' || audience === 'team') attendance.value = audience;
  updateContext();
  [engagement, moduleSelect, daySelect, attendance].forEach((element) =>
    element.addEventListener('change', () => {
      updateContext();
      confirmation.hidden = true;
    }),
  );
  form.querySelector('[data-change-context]')?.addEventListener('click', (event) => {
    event.preventDefault();
    engagement.focus({ preventScroll: true });
    engagement.scrollIntoView({ block: 'center', behavior: 'instant' });
  });

  // Preserve the existing module-to-form event for callers using an in-page enquiry.
  window.addEventListener('select-course-module', (event) => {
    if (!(event instanceof CustomEvent)) return;
    const number = String(event.detail?.moduleNumber ?? '').padStart(2, '0');
    if (!/^0[1-6]$/.test(number)) return;
    engagement.value = 'Strategy Course (DLA)';
    moduleSelect.value = number;
    updateContext();
  });

  function readEnquiry() {
    const data = new FormData(form);
    const clean = (key: string) => String(data.get(key) ?? '').trim();
    const payload = {
      name: clean('name'),
      email: clean('email'),
      context: clean('context'),
      roleOrganization: clean('roleOrganization'),
      teamSize: clean('teamSize'),
      engagement: engagement.value || 'General enquiry',
      programme: programme.value,
      programmeDay: daySelect.value,
      courseModule: moduleSelect.value,
      attendance: attendance.value,
      offeringContext: contextText.textContent ?? '',
      source: origin,
      pageUrl: location.origin + location.pathname,
    };
    const subject = 'The Spotted Ape enquiry — ' + (payload.offeringContext || payload.engagement);
    const emailBody = [
      'Name: ' + payload.name,
      'Email: ' + payload.email,
      payload.roleOrganization ? 'Role & organisation: ' + payload.roleOrganization : '',
      payload.teamSize ? 'Team size: ' + payload.teamSize : '',
      'Area: ' + payload.engagement,
      payload.programme ? 'Programme: ' + payload.programme : '',
      payload.programmeDay ? 'Working day: ' + selectedDay().textContent : '',
      payload.courseModule ? 'Course module: ' + selectedModule().textContent : '',
      payload.attendance ? 'Enquiring for: ' + payload.attendance : '',
      'Origin: ' + origin,
      '',
      payload.context,
    ]
      .filter(Boolean)
      .join('\n');
    return {
      payload,
      subject,
      emailHref:
        'mailto:hello@thespottedape.com?subject=' +
        encodeURIComponent(subject) +
        '&body=' +
        encodeURIComponent(emailBody),
    };
  }

  // Regenerate the recovery email from the latest edits before its native action.
  fallback.addEventListener('click', () => {
    fallback.href = readEnquiry().emailHref;
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (submit.disabled || !form.reportValidity()) return;
    const data = new FormData(form);
    const clean = (key: string) => String(data.get(key) ?? '').trim();
    if (clean('botcheck') || clean('_honey')) {
      status.textContent = 'Thank you. Your enquiry has been received.';
      return;
    }
    const { payload, subject, emailHref } = readEnquiry();
    fallback.href = emailHref;
    const key = form.dataset.web3formsKey?.trim();
    const endpoint = key
      ? 'https://api.web3forms.com/submit'
      : form.dataset.endpoint?.trim() || 'https://formsubmit.co/ajax/hello@thespottedape.com';
    const body = {
      ...payload,
      subject,
      _subject: subject,
      replyto: payload.email,
      _replyto: payload.email,
      from_name: 'The Spotted Ape Website',
      ...(key
        ? { access_key: key, botcheck: '' }
        : { _captcha: 'false', _template: 'table', _honey: '' }),
    };
    submit.disabled = true;
    submit.textContent = 'Sending…';
    form.setAttribute('aria-busy', 'true');
    status.textContent = 'Sending your enquiry…';
    confirmation.hidden = true;
    fallback.hidden = true;
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const result = await response.json().catch(() => null);
      if (
        !response.ok ||
        result?.success === false ||
        result?.success === 'false' ||
        /activate/i.test(String(result?.message ?? ''))
      )
        throw new Error('Delivery unavailable');
      for (const name of ['name', 'email', 'context', 'roleOrganization']) {
        const field = form.elements.namedItem(name);
        if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement)
          field.value = '';
      }
      confirmation.hidden = false;
      status.textContent = 'Enquiry submitted.';
    } catch {
      status.textContent =
        'We couldn’t send your enquiry. Please try again or use the email link below. Your details are still here.';
      fallback.hidden = false;
    } finally {
      submit.disabled = false;
      submit.innerHTML = submitLabel;
      form.removeAttribute('aria-busy');
    }
  });
});
