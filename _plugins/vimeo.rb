class Vimeo < Liquid::Tag

  def initialize(tagName, markup, tokens)
    super
    @text = markup
  end

  def render(context)
    if parts = @text.match(/(\d+) (\d+) (\d+)/)
      id, width, height = parts[1].strip, parts[2].strip, parts[3].strip
    else
      raise "Problem detected with the Vimeo tag paramters"
    end
    
    "<iframe src=\"http://player.vimeo.com/video/#{id}\" width=\"#{width}\" height=\"#{height}\" frameborder=\"0\" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>"
  end

  Liquid::Template.register_tag "vimeo", self
end