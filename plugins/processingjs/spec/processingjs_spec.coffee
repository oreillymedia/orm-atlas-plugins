describe "ProcessingJS", ->

  it "converts into a widget", ->
    
    el = $("""
<pre data-executable="true" data-code-language="processingjs">
void setup() {
  size(200,200);
}
</pre>""")

    $("body").append(el)
    pjs = new atlasplugins.ProcessingJS(el[0])
    expect($('.processing-runit').length).toEqual(1)