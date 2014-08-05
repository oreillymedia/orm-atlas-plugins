describe "ProcessingJS", ->

  beforeEach ->
    $(".processingjs").remove()

  afterEach ->
    $(".processingjs").remove()

  it "converts into a widget", ->
    
    el = $("""
<pre data-code-language="processingjs">
void setup() {
  size(200,200);
  fill(255, 0, 0);
  rect(100, 100, 50, 50);
}
</pre>""")

    $("body").append(el)
    pjs = new atlasplugins.ProcessingJS(el[0])
    expect($('.processingjs').length).toEqual(1)



  # WORKS ON MULTIPLE

  # WORK AUTOMATIC