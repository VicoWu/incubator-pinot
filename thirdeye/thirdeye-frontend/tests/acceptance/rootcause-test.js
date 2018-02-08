import { test } from 'qunit';
import moduleForAcceptance from 'thirdeye-frontend/tests/helpers/module-for-acceptance';

const PLACEHOLDER = '.rootcause-placeholder';
const TABS = '.rootcause-tabs';
const LABEL = '.rootcause-legend__label';
const SELECTED_METRIC = '.rootcause-select-metric-dimension';
const ROOTCAUSE_HEADER = 'rootcause-header';
const HEADER = `.${ROOTCAUSE_HEADER}__major`;
const LAST_SAVED = `.${ROOTCAUSE_HEADER}__last-updated-info`;
const COMMENT_TEXT = `.${ROOTCAUSE_HEADER}--textarea`;
const BASELINE = '#select-compare-mode';
const EXPAND_ANOMALY_BTN = '.rootcause-anomaly__icon a';
const ANOMALY_TITLE = '.rootcause-anomaly__title';
const ANOMALY_VALUE = '.rootcause-anomaly__props-value';
const ANOMALY_STATUS = '.ember-radio-button.checked';

moduleForAcceptance('Acceptance | rootcause');

test('empty state of rootcause page should have a placeholder and no tabs', async (assert) => {
  await visit('/rootcause');

  assert.equal(
    currentURL(),
    '/rootcause',
    'link is correct');
  assert.ok(
    find(PLACEHOLDER).get(0),
    'placeholder exists'
  );
  assert.notOk(
    find(TABS).get(0),
    'tabs do not exist'
  );
});

test(`visiting /rootcause with only a metric provided should have correct metric name selected by default and displayed
in the legend`, async assert => {
  await visit('/rootcause?metricId=1');

  assert.equal(
    currentURL(),
    '/rootcause?metricId=1',
    'link is correct');
  assert.equal(
    find(LABEL).get(0).innerText,
    'pageViews',
    'metric label is correct'
  );
  assert.equal(
    find(SELECTED_METRIC).get(0).innerText,
    'pageViews',
    'selected metric is correct'
  );
});

test('visiting rootcause page with a session should have correct session name, text, and owner', async assert => {
  await visit('/rootcause?sessionId=1');

  assert.equal(
    currentURL(),
    '/rootcause?sessionId=1',
    'link is correct');
  assert.equal(
    find(HEADER).get(0).innerText,
    'My Session',
    'session name is correct');
  assert.ok(
    find(LAST_SAVED).get(0).innerText.includes('Last saved by rootcauseuser'),
    'last saved information is correct');
  assert.equal(
    find(COMMENT_TEXT).get(0).value,
    'Cause of anomaly is unknown',
    'comments are correct');
  assert.equal(
    find(BASELINE).get(0).innerText,
    'WoW',
    'default baseline is correct');
});

test('visiting rootcause page with an anomaly should have correct anomaly information', async assert => {
  await visit('/rootcause?anomalyId=1');
  await click(EXPAND_ANOMALY_BTN);

  assert.equal(
    currentURL(),
    '/rootcause?anomalyId=1',
    'link is correct');
  assert.equal(
    find(ANOMALY_TITLE).get(0).innerText,
    'Anomaly #1 anomaly_label',
    'anomaly title is correct'
  );
  assert.equal(
    find(ANOMALY_VALUE).get(0).innerText,
    'pageViews',
    'metric name in anomaly card is correct'
  );
  assert.equal(
    find(ANOMALY_STATUS).get(0).innerText.trim(),
    'No (False Alarm)',
    'anomaly status is correct');
});